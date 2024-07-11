const queryDB = require("../utils/queryDB");

const getServicos = async (req, res) => {
  try {
    const servicos = await queryDB("SELECT * FROM servicos");
    res.status(200).json(servicos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar serviços" });
  }
};

const criarServico = async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await queryDB("INSERT INTO servicos (nome, preco) VALUES ($1, $2)", [nome, preco]);
    const servicos = await queryDB("SELECT * FROM servicos");
    res.status(201).json({ message: "Serviço criado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar serviço" });
  }
};

const atualizarServico = async (req, res) => {
  const { nome, preco } = req.body;
  const id = req.params.id;
  try {
    await queryDB("UPDATE servicos SET nome = $1, preco = $2 WHERE id = $3", [nome, preco, id]);
    const servicos = await queryDB("SELECT * FROM servicos");
    res.status(200).json({ message: "Serviço atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar serviço" });
  }
};

const deletarServico = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM servicos WHERE id = $1", [id]);
    res.status(200).json({ message: "Serviço deletado com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar serviço" });
  }
};

module.exports = {
  getServicos,
  criarServico,
  atualizarServico,
  deletarServico,
};
