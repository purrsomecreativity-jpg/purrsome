/**
 * Encuesta general (para quien busca otra cosa distinta a branding o web).
 * Mismo formato que app/encuesta-web/preguntas.ts
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
  slug: "general",
  tag: "Cuéntanos tu idea",
  titulo: "Cuéntanos qué tienes en mente.",
  sub: "Pocas preguntas, unos 3 minutos. Si algo no aplica, déjalo en blanco y lo hablamos.",
  gracias: {
    titulo: "Listo, ya lo tenemos.",
    sub: "Revisamos lo que nos contaste y te escribimos muy pronto por WhatsApp o correo.",
  },
};

export const BLOQUES: Bloque[] = [
  {
    letra: "A",
    titulo: "Sobre ti y tu negocio",
    intro: "Para entender quién eres y qué haces.",
    preguntas: [
      { id: "negocio", tipo: "textarea", texto: "¿A qué se dedica tu negocio o marca?", nota: "Una o dos frases son suficientes.", placeholder: "Somos…" },
      { id: "etapa", tipo: "select", texto: "¿En qué etapa está?", opciones: op("Es una idea, todavía no arranca", "Recién empezando", "Ya vendo, pero quiero crecer", "Ya está establecido y quiero dar el siguiente paso") },
      { id: "redes", tipo: "text", texto: "¿Tienes Instagram, página web u otra presencia online?", nota: "Opcional. Déjanos el enlace o el @.", placeholder: "@usuario o enlace" },
    ],
  },
  {
    letra: "B",
    titulo: "Lo que necesitas",
    preguntas: [
      { id: "necesidad", tipo: "multi", texto: "¿Con qué te gustaría que te ayudemos?", opciones: op("Redes sociales y contenido", "Anuncios pagados (Meta o Google)", "SEO y aparecer en Google", "Video o fotos para mi marca", "Una app, portal o sistema a medida", "Automatizar procesos o atención al cliente", "Una tienda online", "Todavía no lo sé, quiero que me asesoren") },
      { id: "detalle", tipo: "textarea", texto: "Cuéntanos con tus palabras qué quieres lograr.", nota: "Mientras más detalle, mejor podemos prepararnos para la llamada.", placeholder: "Quiero…" },
      { id: "problema", tipo: "textarea", texto: "¿Qué es lo que hoy más te frena o te quita tiempo?", nota: "Opcional.", placeholder: "Lo que más me cuesta es…" },
    ],
  },
  {
    letra: "C",
    titulo: "Tiempos y contacto",
    preguntas: [
      { id: "fecha", tipo: "select", texto: "¿Para cuándo lo necesitas?", opciones: op("Lo antes posible", "En el próximo mes", "En los próximos 3 meses", "Sin prisa, estoy explorando") },
      { id: "contacto_pref", tipo: "select", texto: "¿Cómo prefieres que te contactemos?", opciones: op("WhatsApp", "Correo", "Llamada") },
      { id: "como_llegaste", tipo: "text", texto: "¿Cómo conociste a Purrsome?", nota: "Opcional.", placeholder: "Instagram, un amigo, Google…" },
    ],
  },
];

/** Total de preguntas, para la barra de progreso */
export const TOTAL = BLOQUES.reduce((n, b) => n + b.preguntas.length, 0);
