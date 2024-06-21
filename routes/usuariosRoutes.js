const express = require("express");
const { getUsuarios, registrarUsuario, loginUsuario, getPerfilUsuario, getAgendamentosUsuario } = require("../src/controllers/usuariosController.js");

const router = express.Router();

router.get("/", getUsuarios);
router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", getPerfilUsuario);
router.get("/perfil/agendamentos", getAgendamentosUsuario)

module.exports = router;
