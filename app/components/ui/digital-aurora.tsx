"use client";
import { useRef, useEffect } from "react";

interface ShaderProps {
  flowSpeed?: number;
  colorIntensity?: number;
  noiseLayers?: number;
  mouseInfluence?: number;
}

const vertexShaderSource = `
  attribute vec2 aPosition;
  void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  uniform float uFlowSpeed;
  uniform float uColorIntensity;
  uniform float uNoiseLayers;
  uniform float uMouseInfluence;

  #define MARCH_STEPS 32

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float fbm(vec3 p) {
    float f = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uNoiseLayers) break;
      f += amp * hash(p.xy);
      p *= 2.0;
      amp *= 0.5;
    }
    return f;
  }

  float map(vec3 p) {
    vec3 q = p;
    q.z += iTime * uFlowSpeed;
    vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;
    q.xy += mouse * uMouseInfluence;
    float f = fbm(q * 2.0);
    f *= sin(p.y * 2.0 + iTime) * 0.5 + 0.5;
    return clamp(f, 0.0, 1.0);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    vec3 ro = vec3(0, -1, 0);
    vec3 rd = normalize(vec3(uv, 1.0));
    vec3 col = vec3(0);
    float t = 0.0;

    for (int i = 0; i < MARCH_STEPS; i++) {
      vec3 p = ro + rd * t;
      float density = map(p);
      if (density > 0.0) {
        vec3 auroraColor = 0.5 + 0.5 * cos(iTime * 0.5 + p.y * 2.0 + vec3(0, 2, 4));
        col += auroraColor * density * 0.1 * uColorIntensity;
      }
      t += 0.1;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function InteractiveShader({
  flowSpeed = 0.4,
  colorIntensity = 1.2,
  noiseLayers = 4.0,
  mouseInfluence = 0.3,
}: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vs = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes      = gl.getUniformLocation(program, "iResolution");
    const uTime     = gl.getUniformLocation(program, "iTime");
    const uMouse    = gl.getUniformLocation(program, "iMouse");
    const uFlow     = gl.getUniformLocation(program, "uFlowSpeed");
    const uColor    = gl.getUniformLocation(program, "uColorIntensity");
    const uNoise    = gl.getUniformLocation(program, "uNoiseLayers");
    const uInfluence= gl.getUniformLocation(program, "uMouseInfluence");

    const startTime = performance.now();
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    resize();

    const loop = () => {
      if (!gl || gl.isContextLost()) return;
      gl.uniform1f(uTime,      (performance.now() - startTime) / 1000);
      gl.uniform2f(uMouse,     mousePos.current.x * canvas.width, (1 - mousePos.current.y) * canvas.height);
      gl.uniform1f(uFlow,      flowSpeed);
      gl.uniform1f(uColor,     colorIntensity);
      gl.uniform1f(uNoise,     noiseLayers);
      gl.uniform1f(uInfluence, mouseInfluence);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (!gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      }
    };
  }, [flowSpeed, colorIntensity, noiseLayers, mouseInfluence]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function AuroraBackground() {
  return (
    <>
      <InteractiveShader flowSpeed={0.5} colorIntensity={4.5} noiseLayers={6.0} mouseInfluence={0.5} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </>
  );
}
