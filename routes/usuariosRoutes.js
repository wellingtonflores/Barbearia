const express = require("express");
const { getUsuarios, registrarUsuario, loginUsuario } = require("../src/controllers/usuariosController.js");

const router = express.Router();

router.get("/", getUsuarios);
router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);

module.exports = router;
