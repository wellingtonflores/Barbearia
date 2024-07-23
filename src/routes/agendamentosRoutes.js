const express = require("express");
const { getAgendamentos, criarAgendamento, atualizarAgendamento, deletarAgendamento } = require("../controllers/agendamentosController");
const usuarioLogado = require("../middlewares/usuarioLogado")


const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", usuarioLogado, criarAgendamento);
router.put("/:id", usuarioLogado, atualizarAgendamento);
router.delete("/:id", deletarAgendamento);

module.exports = router;
