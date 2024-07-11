const express = require("express");
const {
  getUsuarios,
  registrarUsuario,
  loginUsuario,
  getPerfilUsuario,
  getAgendamentosUsuario,
  atualizaNomeUsuario,
} = require("../controllers/usuariosController");
const usuarioLogado = require("../middlewares/usuarioLogado");
const { verificaEmailValido, verificaSenhaForte, verificaTelefoneValido } = require("../middlewares/validacaoEmailSenha");

const router = express.Router();

router.get("/", getUsuarios);
router.post(
  "/registrar",
  verificaEmailValido,
  verificaSenhaForte,
  verificaTelefoneValido,
  registrarUsuario
);
router.post("/login", verificaEmailValido, loginUsuario);
router.get("/perfil", usuarioLogado, getPerfilUsuario);
router.get("/perfil/agendamentos", usuarioLogado, getAgendamentosUsuario);
router.patch("/perfil",  usuarioLogado, atualizaNomeUsuario);

module.exports = router;
