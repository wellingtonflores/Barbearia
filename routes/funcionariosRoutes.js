import express from "express";
import { getFuncionarios, criarFuncionario, atualizarFuncionario, deletarFuncionario } from "../src/controllers/funcionariosController.js";

const router = express.Router();

router.get("/", getFuncionarios);
router.post("/", criarFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", deletarFuncionario);

export default router;
