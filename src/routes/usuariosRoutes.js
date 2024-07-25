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

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna uma lista de usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   whatsapp:
 *                     type: string
 *                   senha:
 *                     type: string
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get("/", getUsuarios);

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     tags: [Usuários]
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               whatsapp:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao registrar usuário
 */
router.post(
  "/registrar",
  verificaEmailValido,
  verificaSenhaForte,
  verificaTelefoneValido,
  registrarUsuario
);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Senha incorreta ou dados inválidos
 *       404:
 *         description: Email não encontrado
 *       500:
 *         description: Erro ao fazer login
 */
router.post("/login", verificaEmailValido, loginUsuario);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna o perfil do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 whatsapp:
 *                   type: string
 *                 senha:
 *                   type: string
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar perfil
 */
router.get("/perfil", usuarioLogado, getPerfilUsuario);

/**
 * @swagger
 * /api/usuarios/perfil/agendamentos:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna os agendamentos do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Agendamentos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Nome_Completo:
 *                     type: string
 *                   Nome_do_Serviço:
 *                     type: string
 *                   Preço_do_serviço:
 *                     type: number
 *                   Nome_do_funcionario:
 *                     type: string
 *                   data_do_agendamento:
 *                     type: string
 *                     format: date
 *                   horario_do_agendamento:
 *                     type: string
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar agendamentos do usuário
 */
router.get("/perfil/agendamentos", usuarioLogado, getAgendamentosUsuario);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   patch:
 *     tags: [Usuários]
 *     summary: Atualiza o nome do usuário logado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nome do usuário atualizado com sucesso
 *       400:
 *         description: Novo nome obrigatório
 *       500:
 *         description: Erro ao atualizar nome
 */
router.patch("/perfil", usuarioLogado, atualizaNomeUsuario);

module.exports = router;
