import express from "express";
import bodyParser from "body-parser";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import servicosRoutes from "./routes/servicosRoutes.js";
import funcionariosRoutes from "./routes/funcionariosRoutes.js";
import agendamentosRoutes from "./routes/agendamentosRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicos", servicosRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});
