const express = require("express");
const { getFuncionarios, criarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../src/controllers/funcionariosController.js");


const router = express.Router();

router.get("/", getFuncionarios);
router.post("/", criarFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", deletarFuncionario);

module.exports = router;
