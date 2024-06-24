const express = require("express");
const { getFuncionarios, criarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controllers/funcionariosController");


const router = express.Router();

router.get("/", getFuncionarios);
router.post("/", criarFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", deletarFuncionario);

module.exports = router;
