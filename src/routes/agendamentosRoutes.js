const express = require("express");
const { getAgendamentos, criarAgendamento, atualizarAgendamento, deletarAgendamento } = require("../controllers/agendamentosController");


const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", criarAgendamento);
router.put("/:id", atualizarAgendamento);
router.delete("/:id", deletarAgendamento);

module.exports = router;
