// Servidor para uso local (npm start). En Netlify se usa
// netlify/functions/analizar.js y este archivo no se ejecuta.
require("dotenv").config();
const express = require("express");
const { analizarEnlace } = require("./lib/analizar");

if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
  console.error("Configure GEMINI_API_KEY y GEMINI_MODEL en el archivo .env.");
  process.exit(1);
}

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));

app.post("/api/analizar", async (req, res) => {
  const { status, body } = await analizarEnlace(req.body?.enlace);
  res.status(status).json(body);
});

app.listen(3000, () => {
  console.log("SECURA disponible en puerto 3000");
});
