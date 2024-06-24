const express = require("express");
const { getServicos, criarServico, atualizarServico, deletarServico } = require("../controllers/servicosController");

const router = express.Router();

router.get("/", getServicos);
router.post("/", criarServico);
router.put("/:id", atualizarServico);
router.delete("/:id", deletarServico);

module.exports = router;
