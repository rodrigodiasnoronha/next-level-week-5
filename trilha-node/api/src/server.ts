import "dotenv/config";
import express from "express";

const server = express();

/**
 * Get -> buscar
 * Post -> criar
 * Put -> editar
 * Delete -> deletar
 * Patch -> alterar uma informação especifica (tipo, alterar somente uma senha da entidade Usuário)
 */

server.get("/", function (request, response) {
  return response.json({
    ok: "ok, está funcionando",
  });
});

server.post("/", function (request, response) {
  return response.json({
    ok: "ok, método post está funcionando",
  });
});

const port = process.env.APP_PORT;
server.listen(port, () => console.log(`server running port ${port}`));
