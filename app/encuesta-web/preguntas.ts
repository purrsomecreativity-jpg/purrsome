/**
 * Encuesta de página web universal (cualquier negocio o marca).
 * Mismo formato que app/encuesta-branding/preguntas.ts
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
  slug: "web",
  tag: "Encuesta de página web",
  titulo: "Cuéntanos cómo será tu web.",
  sub: "Preguntas cortas, unos 5 minutos. Responde con lo primero que sientas y, si algo no aplica, déjalo en blanco.",
  gracias: {
    titulo: "¡Listo! Ya lo tenemos.",
    sub: "Con tus respuestas ya podemos darle forma a tu web. Te escribimos muy pronto por WhatsApp.",
  },
};

export const BLOQUES: Bloque[] = [
  {
    letra: "A",
    titulo: "Sobre ti y tu negocio",
    intro: "Para entender qué haces y a quién le hablas.",
    preguntas: [
      { id: "donde", tipo: "multi", texto: "¿Dónde atiendes o vendes?", opciones: op("Local o tienda física", "Oficina o consultorio", "A domicilio", "Online", "En varias ciudades", "Envíos a todo el país") },
      { id: "zonas", tipo: "text", texto: "¿En qué ciudades o zonas?", nota: "Opcional.", placeholder: "Ej. Orlando, Kissimmee" },
      { id: "servicios", tipo: "textarea", texto: "¿Qué servicios o productos quieres destacar en la web?", nota: "Escríbelos todos, así pensamos cómo organizarlos.", placeholder: "Servicio 1, servicio 2, producto 3…" },
      { id: "estrella", tipo: "text", texto: "¿Cuál es tu servicio o producto estrella, el que más te gustaría vender?", placeholder: "Mi favorito es…" },
      { id: "cliente", tipo: "textarea", texto: "¿Cómo es tu cliente ideal?", nota: "Edad, qué busca, qué le importa al elegirte.", placeholder: "Personas de… que buscan…" },
    ],
  },
  {
    letra: "B",
    titulo: "Tu marca",
    preguntas: [
      { id: "logo", tipo: "select", texto: "Sobre tu logo actual:", opciones: op("Lo quiero mantener tal cual", "Quiero actualizarlo o mejorarlo", "Quiero crear uno nuevo", "No tengo logo", "No estoy seguro") },
      { id: "palabras", tipo: "text", texto: "Escribe 3 palabras que quieres que la gente sienta al ver tu marca.", nota: "Ej. cercana, moderna, confiable, elegante, divertida.", placeholder: "Palabra 1, palabra 2, palabra 3" },
      { id: "colores", tipo: "text", texto: "¿Hay colores que te gusten o que prefieras evitar?", placeholder: "Me gustan… y evito…" },
      { id: "referencias", tipo: "textarea", texto: "¿Alguna marca, negocio o cuenta de Instagram cuyo estilo te encante?", nota: "Comparte 1 o 2 ejemplos, con nombre o enlace.", placeholder: "@perfil o enlace, y qué te gusta" },
    ],
  },
  {
    letra: "C",
    titulo: "Tu página web",
    preguntas: [
      { id: "web_actual", tipo: "select", texto: "¿Ya tienes página web?", opciones: op("No, sería mi primera web", "Sí, y quiero rediseñarla", "Sí, solo quiero mejorarla") },
      { id: "objetivo_web", tipo: "multi", texto: "¿Qué es lo más importante que debe lograr tu web?", opciones: op("Que me escriban por WhatsApp", "Agendar citas o reservas online", "Mostrar servicios y precios", "Mostrar resultados o portafolio", "Vender productos online", "Recibir pagos", "Captar correos o contactos", "Dar confianza y verme profesional", "Aparecer en Google") },
      { id: "fotos", tipo: "select", texto: "¿Tienes fotos profesionales?", opciones: op("Sí, de mi marca o mis productos", "Sí, de mi local o mi equipo", "Algunas, pero no muchas", "No, habría que hacerlas") },
      { id: "pruebas", tipo: "select", texto: "¿Tienes pruebas para mostrar, como testimonios, antes y después o casos de éxito?", opciones: op("Sí, ya las tengo", "Puedo conseguirlas", "Todavía no") },
      { id: "dominio", tipo: "select", texto: "¿Ya tienes dominio? (el nombre de tu web, por ejemplo tumarca.com)", opciones: op("Sí, ya lo tengo", "No tengo", "No sé qué es eso") },
      { id: "fecha", tipo: "text", texto: "¿Tienes una fecha ideal para tener la web lista?", nota: "Opcional.", placeholder: "Ej. antes de diciembre" },
    ],
  },
];

/** Total de preguntas, para la barra de progreso */
export const TOTAL = BLOQUES.reduce((n, b) => n + b.preguntas.length, 0);
