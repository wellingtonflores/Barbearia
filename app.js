const express =  require("express");
const bodyParser = require("body-parser");
const usuariosRoutes = require("./src/routes/usuariosRoutes.js");
const servicosRoutes = require("./src/routes/servicosRoutes.js");
const funcionariosRoutes = require("./src/routes/funcionariosRoutes.js");
const agendamentosRoutes = require("./src/routes/agendamentosRoutes.js");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicos", servicosRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);

module.exports = app;