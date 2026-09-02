import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BLOQUES } from "../../cuestionario/preguntas";

/**
 * Recibe el cuestionario y lo manda por correo con Resend.
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY      — clave de resend.com
 *   CUESTIONARIO_TO     — a dónde llega (default: purrsomecreativity@gmail.com)
 *   CUESTIONARIO_FROM   — remitente. Sin dominio verificado usa onboarding@resend.dev
 */
export const runtime = "nodejs";

type Payload = {
  cuestionario?: string;
  contacto?: { empresa?: string; nombre?: string; email?: string; whatsapp?: string };
  respuestas?: Record<string, string>;
  multiples?: Record<string, string[]>;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Falta configurar RESEND_API_KEY." }, { status: 500 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const c = body.contacto ?? {};
  if (!c.nombre?.trim() || !c.email?.trim() || !c.empresa?.trim()) {
    return NextResponse.json({ error: "Faltan empresa, nombre o correo." }, { status: 400 });
  }
  const r = body.respuestas ?? {};
  const m = body.multiples ?? {};

  // Etiquetas legibles para las opciones (value → label)
  const etiqueta = (id: string, v: string) => {
    for (const b of BLOQUES) {
      const q = b.preguntas.find((p) => p.id === id);
      const o = q?.opciones?.find((op) => op.value === v);
      if (o) return o.label;
    }
    return v;
  };

  // ---- HTML del correo ----
  const filas: string[] = [];
  let respondidas = 0;
  for (const b of BLOQUES) {
    filas.push(
      `<tr><td colspan="2" style="padding:22px 0 8px;font:600 12px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.18em;color:#9a9a9a;text-transform:uppercase">Bloque ${b.letra} · ${esc(b.titulo)}</td></tr>`
    );
    for (const q of b.preguntas) {
      let valor = "";
      if (q.tipo === "multi") {
        const vals = m[q.id] ?? [];
        if (vals.length) { valor = vals.map((v) => "• " + esc(etiqueta(q.id, v))).join("<br/>"); respondidas++; }
      } else {
        const v = (r[q.id] ?? "").trim();
        if (v) { valor = esc(q.tipo === "select" ? etiqueta(q.id, v) : v); respondidas++; }
      }
      filas.push(
        `<tr>
          <td style="padding:10px 14px 10px 0;vertical-align:top;width:42%;font:400 13px/1.45 -apple-system,Segoe UI,sans-serif;color:#555">${esc(q.texto)}</td>
          <td style="padding:10px 0;vertical-align:top;font:400 14px/1.5 -apple-system,Segoe UI,sans-serif;color:${valor ? "#111" : "#bbb"}">${valor || "—"}</td>
        </tr>
        <tr><td colspan="2" style="border-bottom:1px solid #eee"></td></tr>`
      );
    }
  }

  const html = `
  <div style="background:#f6f6f6;padding:32px 16px">
    <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:32px 36px">
      <p style="margin:0 0 4px;font:600 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.3em;color:#F59E0B;text-transform:uppercase">Purrsome · Cuestionario de descubrimiento</p>
      <h1 style="margin:0 0 6px;font:800 26px/1.15 -apple-system,Segoe UI,sans-serif;color:#0f0f0f">${esc(c.empresa!)}</h1>
      <p style="margin:0 0 22px;font:400 14px/1.5 -apple-system,Segoe UI,sans-serif;color:#666">
        ${esc(c.nombre!)} · <a href="mailto:${esc(c.email!)}" style="color:#DC4A0A">${esc(c.email!)}</a>${c.whatsapp ? " · " + esc(c.whatsapp) : ""}<br/>
        ${respondidas} respuestas · ${body.cuestionario ?? ""} · ${new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" })}
      </p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${filas.join("")}</table>
    </div>
  </div>`;

  const texto = BLOQUES.flatMap((b) => [
    `\n## Bloque ${b.letra} · ${b.titulo}`,
    ...b.preguntas.map((q) => {
      const v = q.tipo === "multi" ? (m[q.id] ?? []).map((x) => etiqueta(q.id, x)).join(", ") : (q.tipo === "select" ? etiqueta(q.id, r[q.id] ?? "") : (r[q.id] ?? ""));
      return `${q.texto}\n  ${v || "—"}`;
    }),
  ]).join("\n");

  const resend = new Resend(key);
  const to = process.env.CUESTIONARIO_TO ?? "purrsomecreativity@gmail.com";
  const from = process.env.CUESTIONARIO_FROM ?? "Purrsome <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: c.email!,
    subject: `Cuestionario · ${c.empresa} (${c.nombre})`,
    html,
    text: `Cuestionario de descubrimiento\n${c.empresa} — ${c.nombre} <${c.email}> ${c.whatsapp ?? ""}\n${texto}`,
  });

  if (error) {
    console.error("Resend:", error);
    return NextResponse.json({ error: "No se pudo enviar el correo. Intenta de nuevo." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
