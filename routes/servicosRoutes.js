import express from "express";
import { getServicos, criarServico, atualizarServico, deletarServico } from "../controllers/servicosController.js";

const router = express.Router();

router.get("/", getServicos);
router.post("/", criarServico);
router.put("/:id", atualizarServico);
router.delete("/:id", deletarServico);

export default router;
