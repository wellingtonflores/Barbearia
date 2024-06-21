const express =  require("express");
const session = require("./config/session.js");
const bodyParser = require("body-parser");
const usuariosRoutes = require("./routes/usuariosRoutes.js");
const servicosRoutes = require("./routes/servicosRoutes.js");
const funcionariosRoutes = require("./routes/funcionariosRoutes.js");
const agendamentosRoutes = require("./routes/agendamentosRoutes.js");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session);

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicos", servicosRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});
