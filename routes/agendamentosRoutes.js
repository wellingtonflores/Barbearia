import express from "express";
import { getAgendamentos, criarAgendamento, atualizarAgendamento, deletarAgendamento } from "../controllers/agendamentosController.js";

const router = express.Router();

router.get("/", getAgendamentos);
router.post("/", criarAgendamento);
router.put("/:id", atualizarAgendamento);
router.delete("/:id", deletarAgendamento);

export default router;
