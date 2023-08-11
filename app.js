// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
require("ejs");
const { sequelize } = require("./database/db");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//setting
const PORT = process.env.PORT || 3100;
const rutas = require("./src/routes/users.routes");
app.use(rutas);

//arrancampos el servidor
app.listen(PORT, function () {
  console.log("la app esta escuchando en http://localhost: " + PORT);
});

//conexion a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("nos hemos conectado a la base de datos");
  })
  .catch((error) => {
    console.log("se ha producido un error", error);
  });
