const express = require("express");
const { getFuncionarios, criarFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controllers/funcionariosController");
const usuarioLogado = require("../middlewares/usuarioLogado");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Operações relacionadas aos funcionários
 */

/**
 * @swagger
 * /api/funcionarios:
 *   get:
 *     tags: [Funcionários]
 *     summary: Retorna uma lista de funcionários
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erro ao buscar funcionários
 */
router.get("/", getFuncionarios);

/**
 * @swagger
 * /api/funcionarios:
 *   post:
 *     tags: [Funcionários]
 *     summary: Cria um novo funcionário
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
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       500:
 *         description: Erro ao criar funcionário
 */
router.post("/", usuarioLogado, criarFuncionario);

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   put:
 *     tags: [Funcionários]
 *     summary: Atualiza um funcionário existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do funcionário a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro ao atualizar funcionário
 */
router.put("/:id", usuarioLogado, atualizarFuncionario);

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   delete:
 *     tags: [Funcionários]
 *     summary: Deleta um funcionário existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do funcionário a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro ao deletar funcionário
 */
router.delete("/:id", usuarioLogado, deletarFuncionario);

module.exports = router;
