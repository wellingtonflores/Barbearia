const express = require("express");
const { getAgendamentos, criarAgendamento, atualizarAgendamento, deletarAgendamento } = require("../controllers/agendamentosController");
const usuarioLogado = require("../middlewares/usuarioLogado");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Operações relacionadas aos agendamentos
 */

/**
 * @swagger
 * /api/agendamentos:
 *   get:
 *     tags: [Agendamentos]
 *     summary: Retorna uma lista de agendamentos
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   usuarios_id:
 *                     type: integer
 *                   funcionarios_id:
 *                     type: integer
 *                   servicos_id:
 *                     type: integer
 *                   data:
 *                     type: string
 *                     format: date
 *                   hora:
 *                     type: string
 *       500:
 *         description: Erro ao buscar agendamentos
 */
router.get("/", getAgendamentos);

/**
 * @swagger
 * /api/agendamentos:
 *   post:
 *     tags: [Agendamentos]
 *     summary: Cria um novo agendamento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               funcionarios_id:
 *                 type: integer
 *               servicos_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *       500:
 *         description: Erro ao criar agendamento
 */
router.post("/", usuarioLogado, criarAgendamento);

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   put:
 *     tags: [Agendamentos]
 *     summary: Atualiza um agendamento existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do agendamento a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               funcionarios_id:
 *                 type: integer
 *               servicos_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro ao atualizar agendamento
 */
router.put("/:id", usuarioLogado, atualizarAgendamento);

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   delete:
 *     tags: [Agendamentos]
 *     summary: Deleta um agendamento existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do agendamento a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro ao deletar agendamento
 */
router.delete("/:id", usuarioLogado, deletarAgendamento);

module.exports = router;
