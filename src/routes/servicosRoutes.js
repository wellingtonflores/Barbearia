const express = require("express");
const { getServicos, criarServico, atualizarServico, deletarServico } = require("../controllers/servicosController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Operações relacionadas aos serviços
 */

/**
 * @swagger
 * /api/servicos:
 *   get:
 *     tags: [Serviços]
 *     summary: Retorna uma lista de serviços
 *     responses:
 *       200:
 *         description: Lista de serviços
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
 *                   preco:
 *                     type: number
 *                     format: float
 *       500:
 *         description: Erro ao buscar serviços
 */
router.get("/", getServicos);

/**
 * @swagger
 * /api/servicos:
 *   post:
 *     tags: [Serviços]
 *     summary: Cria um novo serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       500:
 *         description: Erro ao criar serviço
 */
router.post("/", criarServico);

/**
 * @swagger
 * /api/servicos/{id}:
 *   put:
 *     tags: [Serviços]
 *     summary: Atualiza um serviço existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do serviço a ser atualizado
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
 *               preco:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro ao atualizar serviço
 */
router.put("/:id", atualizarServico);

/**
 * @swagger
 * /api/servicos/{id}:
 *   delete:
 *     tags: [Serviços]
 *     summary: Deleta um serviço existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do serviço a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       500:
 *         description: Erro ao deletar serviço
 */
router.delete("/:id", deletarServico);

module.exports = router;
