const {
  lista,
  crearreserva,
  crearUsuarios,
  listadoReserva,
  renderEditar,
  obtenerUnaReserva,
  actualizarReserva,
  EliminarReserva
} = require("../controllers/user.controllers");

const routes = require("express").Router();

//vistas

routes.get("/crear", crearreserva);

routes.get("/", lista);

routes.get("/editar/:id", renderEditar);

//Peticiones

routes.get("/api/:id", obtenerUnaReserva);

routes.get('/api/', listadoReserva)


routes.post('/api', crearUsuarios)

routes.put("/api/:id", actualizarReserva)

routes.delete("/api/:id", EliminarReserva)
module.exports = routes;
