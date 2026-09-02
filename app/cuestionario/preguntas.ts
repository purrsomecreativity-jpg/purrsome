/**
 * Cuestionario de descubrimiento — Tienda en línea B2B + B2C (Odoo).
 * Para crear otro cuestionario, duplica este archivo y cambia BLOQUES.
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

export const META = {
  slug: "ecommerce-b2b-b2c",
  tag: "Cuestionario de descubrimiento",
  titulo: "Cuéntanos cómo funciona tu negocio.",
  sub: "Cada respuesta define una decisión de diseño. Lo que no sepas, déjalo en blanco — lo conversamos. Toma unos 15 minutos.",
  gracias: {
    titulo: "¡Listo! Ya lo tenemos.",
    sub: "Con esto preparamos tu propuesta: alcance, fases, tiempos y precio. Te escribimos en los próximos días.",
  },
};

export const BLOQUES: Bloque[] = [
  {
    letra: "A",
    titulo: "El negocio",
    intro: "Para entender a quién le estamos diseñando.",
    preguntas: [
      { id: "que_hacen", tipo: "text", texto: "¿A qué se dedica la empresa, en una frase?", placeholder: "Distribuimos…" },
      { id: "marcas", tipo: "textarea", texto: "¿Cuáles son las marcas que distribuyen?", nota: "Escríbelas todas — nos sirve para pensar cómo se organiza el catálogo.", placeholder: "Marca 1, Marca 2, Marca 3…" },
      { id: "tiempo", tipo: "text", texto: "¿Cuánto tiempo tienen operando?", placeholder: "Ej. 6 años" },
      { id: "zonas", tipo: "text", texto: "¿En qué ciudades o zonas venden y entregan?", placeholder: "Caracas, Valencia, todo el país…" },
      { id: "personas_pedidos", tipo: "text", texto: "¿Cuántas personas van a atender los pedidos que entren por la web?", placeholder: "Ej. 2 personas" },
      { id: "como_llega_pedido", tipo: "textarea", texto: "Hoy, sin la web, ¿cómo les llega un pedido?", nota: "Por WhatsApp, por vendedor, por teléfono, presencial…", placeholder: "Cuéntanos el proceso actual" },
      { id: "dolor", tipo: "textarea", texto: "¿Qué es lo que más les cuesta o les quita tiempo de ese proceso actual?", nota: "Esta es de las respuestas más útiles: es el problema que la web debería resolver.", placeholder: "Lo que más duele hoy…" },
    ],
  },
  {
    letra: "B",
    titulo: "Sus dos tipos de cliente",
    intro: "Aquí está el corazón del proyecto. Vender al público y vender al mayor desde la misma tienda es lo que hace este diseño distinto a uno normal — mientras más detalle, más precisa la propuesta.",
    preguntas: [
      { id: "b2b_quien", tipo: "textarea", texto: "¿Quién es su cliente mayorista? ¿Qué tipo de negocio?", nota: "Farmacias, abastos, restaurantes, tiendas, otros distribuidores…", placeholder: "Nuestros mayoristas son…" },
      { id: "b2b_precios", tipo: "select", texto: "¿Todos los mayoristas pagan el mismo precio?", opciones: [
        { value: "unico", label: "Sí, un solo precio de mayor" },
        { value: "por_cliente", label: "No, cada cliente tiene su precio negociado" },
        { value: "por_volumen", label: "Depende del volumen que compre" },
      ] },
      { id: "b2b_precio_publico", tipo: "select", texto: "¿El precio de mayor puede verse públicamente en la web?", opciones: [
        { value: "publico", label: "Sí, cualquiera puede verlo" },
        { value: "login", label: "No, solo se ve al iniciar sesión" },
        { value: "no_se", label: "No estoy seguro / a conversar" },
      ] },
      { id: "b2b_alta", tipo: "select", texto: "¿Cómo entra un cliente nuevo al canal mayorista?", opciones: [
        { value: "solo", label: "Se registra solo y compra de inmediato" },
        { value: "aprobacion", label: "Se registra y nosotros lo aprobamos antes de darle acceso" },
        { value: "manual", label: "Solo lo damos de alta nosotros manualmente" },
      ] },
      { id: "b2b_minimo", tipo: "text", texto: "¿Hay pedido mínimo al mayor? ¿En monto o en cantidad?", placeholder: "Ej. mínimo $200 / 12 unidades por producto / no hay" },
      { id: "b2b_pago", tipo: "multi", texto: "¿Cómo paga el mayorista?", nota: "Marca todas las que apliquen", opciones: [
        { value: "online", label: "Paga en línea al momento del pedido" },
        { value: "factura", label: "Hace el pedido y luego se le factura" },
        { value: "credito", label: "Tiene crédito y días de pago" },
        { value: "depende", label: "Depende del cliente" },
      ] },
      { id: "b2b_rapido", tipo: "textarea", texto: "¿Hay algo que un mayorista necesite hacer rápido y hoy sea engorroso?", nota: "Repetir el pedido del mes pasado, pedir por código, ver su saldo…", placeholder: "Por ejemplo…" },
      { id: "b2c_quien", tipo: "textarea", texto: "¿Quién es el cliente final? Descríbelo como si fuera una persona.", placeholder: "Es una persona que…" },
      { id: "b2c_compra", tipo: "text", texto: "¿Qué compra normalmente el cliente final? ¿Uno o dos productos, o pedidos grandes?", placeholder: "Normalmente…" },
      { id: "proporcion", tipo: "text", texto: "Aproximadamente, ¿qué parte del negocio es mayorista y qué parte es al público?", nota: "Aunque sea a ojo.", placeholder: "Ej. 70% mayor / 30% detal" },
      { id: "prioridad", tipo: "select", texto: "¿Cuál de los dos canales es la prioridad para esta web?", opciones: [
        { value: "b2b", label: "Mayorista — es donde está el negocio" },
        { value: "b2c", label: "Público final — queremos crecer ahí" },
        { value: "ambos", label: "Los dos por igual" },
      ] },
    ],
  },
  {
    letra: "C",
    titulo: "El catálogo",
    intro: "Con 12 marcas, que la gente encuentre lo que busca es la mitad del trabajo.",
    preguntas: [
      { id: "cuantos_productos", tipo: "text", texto: "¿Cuántos productos hay en total, aproximadamente?", placeholder: "Ej. 350" },
      { id: "productos_tienen", tipo: "multi", texto: "Los productos que ya están cargados en Odoo, ¿qué tienen?", opciones: [
        { value: "nombre_precio", label: "Nombre y precio" },
        { value: "descripcion", label: "Descripción" },
        { value: "foto", label: "Foto" },
        { value: "categoria", label: "Categoría" },
        { value: "marca", label: "Marca" },
        { value: "inventario", label: "Existencia / inventario en tiempo real" },
      ] },
      { id: "fotos", tipo: "select", texto: "Las fotos de producto, ¿son propias o las manda cada marca?", nota: "Nos importa si son parejas entre sí o si cada marca manda un estilo distinto.", opciones: [
        { value: "propias", label: "Son nuestras, con un mismo estilo" },
        { value: "marcas", label: "Las manda cada marca, estilos distintos" },
        { value: "mezcla", label: "Mezcla de ambas" },
        { value: "faltan", label: "Faltan muchas fotos" },
      ] },
      { id: "como_busca", tipo: "multi", texto: "Cuando alguien entra a buscar algo, ¿cómo crees que lo busca?", opciones: [
        { value: "marca", label: "Por marca" },
        { value: "categoria", label: "Por categoría de producto" },
        { value: "codigo", label: "Por nombre exacto o código" },
        { value: "navegando", label: "Navegando, sin saber bien qué quiere" },
      ] },
      { id: "no_mostrar", tipo: "text", texto: "¿Hay productos que NO deben aparecer en la web?", placeholder: "Ej. los que solo vendemos por contrato / ninguno" },
      { id: "destacar", tipo: "textarea", texto: "¿Hay productos que quieran destacar siempre? ¿Cuáles y por qué?", placeholder: "Los más vendidos son…" },
    ],
  },
  {
    letra: "D",
    titulo: "Pagos y entregas",
    preguntas: [
      { id: "pagos", tipo: "multi", texto: "¿Qué formas de pago aceptan o quieren aceptar?", opciones: [
        { value: "transferencia", label: "Transferencia en Bs" },
        { value: "pago_movil", label: "Pago Móvil" },
        { value: "zelle", label: "Zelle" },
        { value: "binance", label: "Binance / USDT" },
        { value: "tarjeta", label: "Tarjeta en línea" },
        { value: "efectivo", label: "Efectivo contra entrega" },
      ] },
      { id: "pago_donde", tipo: "select", texto: "¿El pago se hace dentro de la web o por fuera?", opciones: [
        { value: "web", label: "Dentro de la web, con la pasarela conectada" },
        { value: "fuera", label: "Se hace el pedido y luego se coordina el pago" },
        { value: "depende", label: "Depende del canal (mayor / detal)" },
      ] },
      { id: "entrega", tipo: "textarea", texto: "¿Cómo funciona la entrega? ¿Cobran envío?", placeholder: "Delivery propio, empresa de encomiendas, costo…" },
      { id: "retiro", tipo: "text", texto: "¿Se puede retirar en un local o depósito?", placeholder: "Sí, en… / no" },
    ],
  },
  {
    letra: "E",
    titulo: "Marca y estilo",
    preguntas: [
      { id: "marca_tienen", tipo: "multi", texto: "¿Qué tienen ya de su marca?", opciones: [
        { value: "logo", label: "Logo" },
        { value: "editables", label: "Archivos editables del logo (.ai, .svg, .psd)" },
        { value: "colores", label: "Colores definidos" },
        { value: "tipografias", label: "Tipografías definidas" },
        { value: "manual", label: "Manual de marca" },
        { value: "nada", label: "No tenemos nada formal" },
      ] },
      { id: "sentir", tipo: "text", texto: "¿Cómo quieren que se sienta la tienda? Tres palabras.", nota: "Confiable, moderna, rápida, cercana, seria, premium…", placeholder: "Ej. confiable, rápida, moderna" },
      { id: "no_estilo", tipo: "textarea", texto: "¿Hay algún estilo que NO quieran? ¿Algo que hayan visto y no les guste?", placeholder: "No queremos que se vea…" },
      { id: "referencia", tipo: "select", texto: "De las tres referencias que te compartimos, ¿cuál se parece más a lo que tienen en mente?", opciones: [
        { value: "amazon_business", label: "Amazon Business — misma tienda, precios según quién entra" },
        { value: "grainger", label: "Grainger — buscador y filtros potentes, catálogo enorme" },
        { value: "faire", label: "Faire — mayorista con diseño cuidado" },
        { value: "otra", label: "Ninguna / tengo otra referencia (cuéntanos abajo)" },
      ] },
      { id: "competidores", tipo: "textarea", texto: "¿Hay competidores o tiendas que quieran que revisemos?", placeholder: "Links o nombres" },
    ],
  },
  {
    letra: "F",
    titulo: "Lo técnico",
    intro: "Esto define quién hace qué, y es lo que más peso tiene en la propuesta.",
    preguntas: [
      { id: "link_tienda", tipo: "text", texto: "Link de la tienda como está hoy", nota: "Aunque esté sin terminar. Necesitamos verla por dentro.", placeholder: "https://…" },
      { id: "odoo_version", tipo: "text", texto: "¿Qué versión de Odoo instalaron y quién se los montó?", placeholder: "Ej. Odoo 17, lo instaló…" },
      { id: "quien_monta", tipo: "select", texto: "El diseño que entreguemos, ¿quién lo monta dentro de Odoo?", opciones: [
        { value: "equipo", label: "Nuestro equipo técnico lo monta" },
        { value: "proveedor", label: "El proveedor que nos instaló Odoo lo monta" },
        { value: "purrsome", label: "Necesitamos que Purrsome también lo monte" },
        { value: "no_definido", label: "Todavía no lo hemos definido" },
      ] },
      { id: "contacto_tecnico", tipo: "text", texto: "Si tienen equipo técnico, ¿con quién nos coordinamos?", placeholder: "Nombre y contacto" },
      { id: "dominio", tipo: "text", texto: "¿Ya tienen dominio propio? ¿Cuál?", placeholder: "www.…" },
      { id: "aprueba", tipo: "text", texto: "¿Quién aprueba el diseño y los textos del lado de ustedes?", placeholder: "Nombre" },
    ],
  },
  {
    letra: "G",
    titulo: "Objetivos y tiempos",
    preguntas: [
      { id: "fecha", tipo: "text", texto: "¿Para cuándo necesitan la tienda funcionando? ¿Hay alguna fecha que la empuje?", nota: "Temporada, lanzamiento, feria, cierre de año…", placeholder: "Ej. antes de diciembre" },
      { id: "exito", tipo: "textarea", texto: "Dentro de seis meses, ¿qué tendría que estar pasando para que digan que la web valió la pena?", placeholder: "Que…" },
      { id: "extra", tipo: "textarea", texto: "¿Hay algo que no te hayamos preguntado y que creas que deberíamos saber?", placeholder: "Lo que quieras agregar" },
    ],
  },
];

/** Total de preguntas, para la barra de progreso */
export const TOTAL = BLOQUES.reduce((n, b) => n + b.preguntas.length, 0);
