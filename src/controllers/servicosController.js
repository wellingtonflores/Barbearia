const { get } = require("../routes/agendamentosRoutes");
const queryDB = require("../utils/queryDB")

const getServicos = async (req, res) => {
  try {
    const servicos = await queryDB("SELECT * FROM servicos");
    res.json(servicos);
  } catch (err) {
    res.json(err);
  }
};

const criarServico = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await queryDB("INSERT INTO servicos (nome, preco) VALUES ($1, $2)", [nome, preco]);
    const servicos = await queryDB("SELECT * FROM servicos");
    res.json(servicos);
  } catch (err) {
    res.json(err);
  }
};

const atualizarServico = async (req, res) => {
  const { nome, preco } = req.body;
  const id = req.params.id;
  try {
    await queryDB("UPDATE servicos SET nome = $1, preco = $2 WHERE id = $3", [nome, preco, id]);
    const servicos = await queryDB("SELECT * FROM servicos");
    res.json(servicos);
  } catch (err) {
    res.json(err);
  }
};

const deletarServico = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM servicos WHERE id = $1", [id]);
    const servicos = await queryDB("SELECT * FROM servicos");
    res.json(servicos);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getServicos,
  criarServico,
  atualizarServico,
  deletarServico,
};
