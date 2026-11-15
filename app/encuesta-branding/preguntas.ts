/**
 * Encuesta de branding universal (cualquier marca, con o sin logo).
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
  slug: "branding",
  tag: "Encuesta de branding",
  titulo: "Cuéntanos sobre tu marca.",
  sub: "Preguntas rápidas, unos 5 minutos. No hay respuestas correctas, responde con lo primero que sientas. Si algo no aplica, déjalo en blanco.",
  gracias: {
    titulo: "¡Listo! Ya lo tenemos.",
    sub: "Con tus respuestas preparamos la dirección de tu marca. Te escribimos muy pronto por WhatsApp.",
  },
};

export const BLOQUES: Bloque[] = [
  {
    letra: "A",
    titulo: "Tú y tu marca",
    intro: "Para entender quién eres y qué ofreces.",
    preguntas: [
      { id: "nombre_marca", tipo: "select", texto: "¿Tu marca lleva tu nombre propio o un nombre comercial?", opciones: op("Mi nombre propio", "Un nombre comercial", "Todavía no tiene nombre") },
      { id: "nombre_idea", tipo: "text", texto: "¿Qué nombre tienes en mente?", nota: "Si aún no tienes uno, déjalo en blanco.", placeholder: "Ej. Casa Aurora" },
      { id: "industria", tipo: "select", texto: "¿A qué se dedica tu marca?", opciones: op("Servicios profesionales o coaching", "Salud y bienestar", "Belleza y estética", "Comida y restaurantes", "Moda y accesorios", "Tienda o e-commerce", "Tecnología y apps", "Educación y cursos", "Arte y creatividad", "Inmobiliaria y construcción", "Automotriz", "Otro") },
      { id: "ofreces", tipo: "textarea", texto: "En una frase: ¿qué ofreces y qué cambio logra tu cliente contigo?", nota: "Del punto A (antes) al punto B (después).", placeholder: "Ayudamos a… para que…" },
    ],
  },
  {
    letra: "B",
    titulo: "Tu cliente ideal",
    intro: "Una marca se diseña para una persona concreta.",
    preguntas: [
      { id: "cliente", tipo: "textarea", texto: "¿Quién es tu cliente ideal?", nota: "Edad, profesión, situación, país e idioma.", placeholder: "Personas de 25 a 40 años que…" },
      { id: "frustracion", tipo: "textarea", texto: "¿Qué necesita o le frustra a tu cliente antes de llegar a ti?", placeholder: "Se siente…" },
      { id: "sentir", tipo: "multi", texto: "¿Qué quieres que sienta alguien al ver tu marca?", nota: "Marca hasta 3.", opciones: op("Confianza", "Calma", "Energía", "Lujo y exclusividad", "Cercanía", "Motivación", "Seguridad", "Inspiración", "Claridad", "Alegría") },
    ],
  },
  {
    letra: "C",
    titulo: "Tu personalidad de marca",
    preguntas: [
      { id: "estilo", tipo: "multi", texto: "¿Qué palabras describen el estilo de tu marca?", nota: "Marca hasta 3.", opciones: op("Cercano", "Profesional", "Inspirador", "Directo", "Elegante", "Divertido", "Atrevido", "Cálido", "Minimalista", "Artesanal", "Moderno", "Clásico") },
      { id: "diferencia", tipo: "textarea", texto: "¿Qué te diferencia de otras marcas como la tuya?", placeholder: "Lo que nos hace distintos es…" },
      { id: "tono", tipo: "select", texto: "Si tu marca fuera una persona hablando, ¿cómo sonaría?", nota: "Elige la que más se acerque.", opciones: op("Como un amigo: cercano y relajado", "Como un experto: seguro y profesional", "Como un guía que inspira: motivador y con energía", "Como una marca de lujo: elegante y reservado", "Como alguien divertido: con humor y atrevido") },
    ],
  },
  {
    letra: "D",
    titulo: "Visual",
    intro: "Aquí definimos la dirección de tu identidad. Si ya tienes logo o colores, cuéntanos igual.",
    preguntas: [
      { id: "colores_si", tipo: "multi", texto: "¿Qué colores te gustan?", opciones: op("Negro", "Blanco", "Beige", "Dorado", "Terracota", "Rojo", "Rosa", "Morado", "Azul marino", "Azul cielo", "Verde", "Verde salvia", "Amarillo", "Naranja") },
      { id: "colores_no", tipo: "text", texto: "¿Qué colores NO quieres usar?", placeholder: "Ej. rojo, neón" },
      { id: "tipo_logo", tipo: "select", texto: "¿Qué tipo de logo te imaginas?", opciones: op("Solo tipografía (el nombre en letras)", "Símbolo o icono con el nombre", "Mi foto o rostro", "Monograma con iniciales", "Ya tengo logo y quiero renovarlo", "No lo sé, quiero ver opciones") },
      { id: "referencias", tipo: "textarea", texto: "Comparte 3 marcas o perfiles de Instagram que te gusten visualmente.", nota: "Pueden ser de tu industria o de cualquier otra. Pon el @ o el link y qué te gusta de cada uno.", placeholder: "@perfil1 porque…" },
      { id: "evitar", tipo: "textarea", texto: "¿Hay algo que quieras evitar?", nota: "Estilos, símbolos, cosas que ya viste y no te gustan. Opcional.", placeholder: "Prefiero que no…" },
    ],
  },
  {
    letra: "E",
    titulo: "Uso de tu marca",
    preguntas: [
      { id: "donde", tipo: "multi", texto: "¿Dónde usarás tu marca?", opciones: op("Instagram", "TikTok", "Página web", "Presentaciones", "PDFs o ebooks", "Empaques y etiquetas", "Ropa o merch", "Local físico o vehículos", "Eventos", "Tarjetas y papelería", "YouTube") },
    ],
  },
];

/** Total de preguntas, para la barra de progreso */
export const TOTAL = BLOQUES.reduce((n, b) => n + b.preguntas.length, 0);
