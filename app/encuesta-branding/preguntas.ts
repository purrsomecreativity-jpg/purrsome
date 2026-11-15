/**
 * Encuesta de branding para coaches (marca sin logo).
 * Mismo formato que app/cuestionario/preguntas.ts
 */
export type Opcion = { value: string; label: string };
export type Pregunta = {
  id: string;
  texto: string;
  tipo: "select" | "multi" | "text" | "textarea";
  nota?: string;
  placeholder?: string;
  opciones?: Opcion[];
};
export type Bloque = { letra: string; titulo: string; intro?: string; preguntas: Pregunta[] };

const op = (...labels: string[]): Opcion[] => labels.map((l) => ({ value: l, label: l }));

export const META = {
  slug: "branding-coach",
  tag: "Encuesta de branding",
  titulo: "Cuéntanos sobre tu marca.",
  sub: "15 preguntas rápidas, unos 5 minutos. No hay respuestas correctas, responde con lo primero que sientas. Con esto diseñamos tu identidad desde cero.",
  gracias: {
    titulo: "¡Listo! Ya lo tenemos.",
    sub: "Con tus respuestas preparamos la dirección de tu marca. Te escribimos muy pronto por WhatsApp.",
  },
};

export const BLOQUES: Bloque[] = [
  {
    letra: "A",
    titulo: "Tú y tu negocio",
    intro: "Para entender quién eres y qué ofreces.",
    preguntas: [
      { id: "nombre_marca", tipo: "select", texto: "¿Tu marca llevará tu nombre propio o un nombre comercial?", opciones: op("Mi nombre propio", "Un nombre comercial", "Todavía no lo he decidido") },
      { id: "nombre_idea", tipo: "text", texto: "¿Qué nombre tienes en mente?", nota: "Si aún no tienes uno, déjalo en blanco.", placeholder: "Ej. María López Coaching" },
      { id: "tipo_coaching", tipo: "select", texto: "¿Qué tipo de coaching ofreces?", opciones: op("Vida y bienestar", "Negocios y liderazgo", "Salud y hábitos", "Relaciones", "Carrera y empleo", "Finanzas", "Espiritual o mindfulness", "Deporte y rendimiento", "Otro") },
      { id: "transformacion", tipo: "textarea", texto: "En una frase: ¿qué transformación logra tu cliente contigo?", nota: "Del punto A (antes) al punto B (después).", placeholder: "Pasan de… a…" },
    ],
  },
  {
    letra: "B",
    titulo: "Tu cliente ideal",
    intro: "Una marca se diseña para una persona concreta.",
    preguntas: [
      { id: "cliente", tipo: "textarea", texto: "¿A quién ayudas?", nota: "Edad, profesión, situación, país e idioma.", placeholder: "Mujeres de 30 a 45 años que…" },
      { id: "frustracion", tipo: "textarea", texto: "¿Qué frustración tiene tu cliente antes de trabajar contigo?", placeholder: "Se siente…" },
      { id: "sentir", tipo: "multi", texto: "¿Qué quieres que sienta alguien al ver tu marca?", nota: "Marca hasta 3.", opciones: op("Confianza", "Calma", "Energía", "Lujo y exclusividad", "Cercanía", "Motivación", "Seguridad", "Inspiración", "Claridad", "Alegría") },
    ],
  },
  {
    letra: "C",
    titulo: "Tu personalidad de marca",
    preguntas: [
      { id: "estilo", tipo: "multi", texto: "¿Qué palabras describen tu estilo?", nota: "Marca hasta 3.", opciones: op("Cercano", "Profesional", "Inspirador", "Directo", "Espiritual", "Elegante", "Divertido", "Disruptivo", "Cálido", "Minimalista") },
      { id: "diferencia", tipo: "textarea", texto: "¿Qué te diferencia de otros coaches?", placeholder: "Lo que me hace distinta es…" },
      { id: "tono", tipo: "select", texto: "¿Cómo quieres hablarle a tus clientes?", opciones: op("De tú, casual y cercano", "De tú, pero profesional", "De usted, formal", "Mezcla según la ocasión") },
    ],
  },
  {
    letra: "D",
    titulo: "Visual, aún sin logo",
    intro: "Aquí definimos la dirección de tu identidad.",
    preguntas: [
      { id: "colores_si", tipo: "multi", texto: "¿Qué colores te gustan?", opciones: op("Negro", "Blanco", "Beige", "Dorado", "Terracota", "Rojo", "Rosa", "Morado", "Azul marino", "Azul cielo", "Verde", "Verde salvia", "Amarillo", "Naranja") },
      { id: "colores_no", tipo: "text", texto: "¿Qué colores NO quieres usar?", placeholder: "Ej. rojo, neón" },
      { id: "tipo_logo", tipo: "select", texto: "¿Qué tipo de logo te imaginas?", opciones: op("Solo tipografía (mi nombre en letras)", "Símbolo o icono con mi nombre", "Mi foto o rostro", "Monograma con mis iniciales", "No lo sé, quiero ver opciones") },
      { id: "referencias", tipo: "textarea", texto: "Comparte 3 marcas o perfiles de Instagram que te gusten visualmente.", nota: "Pueden ser de coaches o de cualquier industria. Pon el @ o el link y qué te gusta de cada uno.", placeholder: "@perfil1 porque…" },
      { id: "evitar", tipo: "textarea", texto: "¿Hay algo que quieras evitar?", nota: "Estilos, símbolos, cosas que ya viste y no te gustan. Opcional.", placeholder: "Prefiero que no…" },
    ],
  },
  {
    letra: "E",
    titulo: "Uso y objetivos",
    preguntas: [
      { id: "donde", tipo: "multi", texto: "¿Dónde usarás tu marca?", opciones: op("Instagram", "TikTok", "Página web", "Presentaciones", "PDFs o ebooks", "Ropa o merch", "Eventos y talleres", "Tarjetas y papelería", "YouTube") },
      { id: "objetivo", tipo: "select", texto: "¿Qué quieres lograr en los próximos 6 a 12 meses?", opciones: op("Conseguir más clientes", "Subir mis precios", "Lanzar un programa o curso", "Verme más profesional", "Construir comunidad", "Otro objetivo") },
    ],
  },
];

/** Total de preguntas, para la barra de progreso */
export const TOTAL = BLOQUES.reduce((n, b) => n + b.preguntas.length, 0);
