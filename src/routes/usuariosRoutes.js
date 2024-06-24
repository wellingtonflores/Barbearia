const express = require("express");
const { getUsuarios, registrarUsuario, loginUsuario, getPerfilUsuario, getAgendamentosUsuario } = require("../controllers/usuariosController");
const usuarioLogado = require("../middlewares/usuarioLogado");

const router = express.Router();

router.get("/", getUsuarios);
router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", usuarioLogado, getPerfilUsuario);
router.get("/perfil/agendamentos", usuarioLogado, getAgendamentosUsuario)

module.exports = router;
