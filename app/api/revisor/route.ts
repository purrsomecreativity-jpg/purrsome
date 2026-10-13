import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Revisor de sitios: recibe una URL + correo, la analiza con Google
 * PageSpeed Insights (velocidad + SEO, movil) y envia el informe por
 * Resend al prospecto, con copia-lead a Purrsome.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY     — ya configurada (la usa el cuestionario)
 *   CUESTIONARIO_FROM  — remitente (se reutiliza)
 *   CUESTIONARIO_TO    — a donde llega el lead (se reutiliza)
 *   PAGESPEED_API_KEY  — opcional; sin clave funciona con cuota baja
 */
export const runtime = "nodejs";
export const maxDuration = 60;

type Payload = { url?: string; nombre?: string; email?: string; lang?: "en" | "es" };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function normalizarUrl(raw: string): string | null {
  let u = raw.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try {
    const parsed = new URL(u);
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

const color = (n: number) => (n >= 90 ? "#3FBF7F" : n >= 50 ? "#F5B400" : "#DA1460");

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Falta configurar RESEND_API_KEY." }, { status: 500 });

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const lang: "en" | "es" = body.lang === "en" ? "en" : "es";
  const url = normalizarUrl(body.url ?? "");
  const email = (body.email ?? "").trim();
  const nombre = (body.nombre ?? "").trim();

  if (!url) {
    return NextResponse.json({ error: lang === "en" ? "That URL doesn't look valid." : "Esa URL no parece válida." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: lang === "en" ? "That email doesn't look valid." : "Ese correo no parece válido." }, { status: 400 });
  }

  // ── Google PageSpeed Insights (estrategia movil) ──
  const psiKey = process.env.PAGESPEED_API_KEY;
  const psiUrl =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
    `?url=${encodeURIComponent(url)}&strategy=MOBILE&category=PERFORMANCE&category=SEO&locale=${lang}` +
    (psiKey ? `&key=${psiKey}` : "");

  let data: {
    lighthouseResult?: {
      categories?: { performance?: { score?: number }; seo?: { score?: number } };
      audits?: Record<string, { score?: number | null; title?: string; numericValue?: number }>;
    };
  };
  try {
    const res = await fetch(psiUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`PSI ${res.status}`);
    data = await res.json();
  } catch {
    return NextResponse.json(
      { error: lang === "en" ? "We couldn't analyze that site. Check the URL and try again." : "No pudimos analizar ese sitio. Revisa la URL e intenta de nuevo." },
      { status: 502 }
    );
  }

  const lr = data.lighthouseResult;
  const perf = Math.round((lr?.categories?.performance?.score ?? 0) * 100);
  const seo = Math.round((lr?.categories?.seo?.score ?? 0) * 100);
  const lcpMs = lr?.audits?.["largest-contentful-paint"]?.numericValue;
  const pesoBytes = lr?.audits?.["total-byte-weight"]?.numericValue;
  const lcp = lcpMs != null ? Math.round(lcpMs / 100) / 10 : null;
  const pesoMb = pesoBytes != null ? Math.round((pesoBytes / 1048576) * 10) / 10 : null;

  const IDS = [
    "render-blocking-resources", "uses-optimized-images", "modern-image-formats",
    "unused-javascript", "server-response-time", "uses-text-compression",
    "meta-description", "document-title", "is-crawlable", "viewport",
  ];
  const problemas: string[] = [];
  for (const id of IDS) {
    const a = lr?.audits?.[id];
    if (a && typeof a.score === "number" && a.score < 0.9 && a.title) problemas.push(a.title);
    if (problemas.length >= 4) break;
  }

  // ── Correos ──
  const resend = new Resend(key);
  const FROM = process.env.CUESTIONARIO_FROM || "Purrsome <onboarding@resend.dev>";
  const TO_LEAD = process.env.CUESTIONARIO_TO || "purrsomecreativity@gmail.com";
  const host = new URL(url).hostname;

  const T = lang === "en"
    ? {
        subject: `Your website scorecard: ${host}`,
        hola: nombre ? `Hi ${esc(nombre)},` : "Hi,",
        intro: `Here's the scorecard for <b>${esc(host)}</b> (mobile, measured with Google's engine):`,
        vel: "Speed", seoL: "SEO",
        lcpL: "First content visible in", peso: "Page weight",
        probs: "What's holding it back:",
        pitch: "The sites we build at Purrsome score 100/100 on SEO and weigh up to 97% less. If you want yours there, we can make it happen.",
        cta: "Let's fix it",
        s: "s", mb: "MB",
      }
    : {
        subject: `La nota de tu sitio: ${host}`,
        hola: nombre ? `Hola ${esc(nombre)},` : "Hola,",
        intro: `Aquí está la nota de <b>${esc(host)}</b> (móvil, medida con el motor de Google):`,
        vel: "Velocidad", seoL: "SEO",
        lcpL: "Primer contenido visible en", peso: "Peso de la página",
        probs: "Lo que lo está frenando:",
        pitch: "Los sitios que construimos en Purrsome salen 100/100 en SEO y pesan hasta 97% menos. Si quieres el tuyo ahí, lo hacemos realidad.",
        cta: "Arreglémoslo",
        s: "s", mb: "MB",
      };

  const score = (label: string, n: number) =>
    `<td align="center" style="padding:18px 10px"><div style="font:800 44px/1 -apple-system,Segoe UI,sans-serif;color:${color(n)}">${n}</div><div style="font:600 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.2em;color:#9a9a9a;text-transform:uppercase;margin-top:8px">${label}</div></td>`;

  const metricas: string[] = [];
  if (lcp != null) metricas.push(`${T.lcpL}: <b>${lcp}${T.s}</b>`);
  if (pesoMb != null) metricas.push(`${T.peso}: <b>${pesoMb} ${T.mb}</b>`);

  const html = `
  <div style="background:#0A0A0C;padding:32px 16px">
    <div style="max-width:560px;margin:0 auto;background:#111114;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:32px">
      <div style="font:800 22px/1 -apple-system,Segoe UI,sans-serif;color:#fff">purrs<span style="color:#DA1460">o</span>me&trade;</div>
      <p style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:#cfcfcf;margin:24px 0 6px">${T.hola}</p>
      <p style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:#cfcfcf;margin:0 0 10px">${T.intro}</p>
      <table width="100%" style="border-collapse:collapse"><tr>${score(T.vel, perf)}${score(T.seoL, seo)}</tr></table>
      ${metricas.length ? `<p style="font:400 14px/1.8 -apple-system,Segoe UI,sans-serif;color:#bdbdbd;margin:4px 0 0">${metricas.join("<br/>")}</p>` : ""}
      ${problemas.length ? `<p style="font:600 13px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;color:#F5B400;text-transform:uppercase;margin:26px 0 10px">${T.probs}</p><ul style="font:400 14px/1.8 -apple-system,Segoe UI,sans-serif;color:#bdbdbd;margin:0;padding-left:18px">${problemas.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
      <p style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:#cfcfcf;margin:26px 0 18px">${T.pitch}</p>
      <a href="https://purrsomecreate.com/start" style="display:inline-block;background:#DA1460;color:#fff;font:600 14px/1 -apple-system,Segoe UI,sans-serif;padding:14px 28px;border-radius:999px;text-decoration:none">${T.cta} &rarr;</a>
      <p style="font:400 12px/1.6 -apple-system,Segoe UI,sans-serif;color:#6e6e6e;margin:28px 0 0">Purrsome&trade; &middot; We see what others don't. &middot; purrsomecreate.com</p>
    </div>
  </div>`;

  const leadHtml = `
  <div style="font:400 15px/1.7 -apple-system,Segoe UI,sans-serif;color:#222">
    <p><b>Nuevo lead del revisor de sitios</b> 🐾</p>
    <p>Sitio: <a href="${esc(url)}">${esc(url)}</a><br/>
    Nombre: ${esc(nombre || "—")}<br/>
    Correo: ${esc(email)}<br/>
    Velocidad: <b>${perf}/100</b> &middot; SEO: <b>${seo}/100</b>
    ${lcp != null ? `<br/>LCP: ${lcp}s` : ""}${pesoMb != null ? ` &middot; Peso: ${pesoMb} MB` : ""}</p>
    ${problemas.length ? `<p>Problemas detectados:<br/>${problemas.map(esc).join("<br/>")}</p>` : ""}
  </div>`;

  try {
    await resend.emails.send({ from: FROM, to: email, subject: T.subject, html });
    await resend.emails.send({
      from: FROM,
      to: TO_LEAD,
      replyTo: email,
      subject: `Lead revisor: ${host} (Vel ${perf} · SEO ${seo})`,
      html: leadHtml,
    });
  } catch {
    // el analisis vale aunque falle el correo; se reporta igual
  }

  return NextResponse.json({ perf, seo, lcp, pesoMb, problemas });
}
