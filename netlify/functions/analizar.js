const { analizarEnlace } = require("../../lib/analizar");

const cabeceras = { "Content-Type": "application/json; charset=utf-8" };

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...cabeceras, Allow: "POST" },
      body: JSON.stringify({ error: "Método no permitido." })
    };
  }

  if ((event.body || "").length > 10240) {
    return {
      statusCode: 413,
      headers: cabeceras,
      body: JSON.stringify({ error: "La solicitud es demasiado grande." })
    };
  }

  let datos;
  try {
    const texto = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "";
    datos = JSON.parse(texto);
  } catch {
    return {
      statusCode: 400,
      headers: cabeceras,
      body: JSON.stringify({ error: "Solicitud inválida." })
    };
  }

  const { status, body } = await analizarEnlace(datos?.enlace);

  return {
    statusCode: status,
    headers: cabeceras,
    body: JSON.stringify(body)
  };
};
