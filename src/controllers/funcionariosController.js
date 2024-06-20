const queryDB = require("../../utils/queryDB")

const getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.json(funcionarios);
  } catch (err) {
    res.json(err);
  }
};

const criarFuncionario = async (req, res) => {
  const { nome, email, telefone, funcao } = req.body;
  try {
    await queryDB("INSERT INTO funcionarios (nome, email, telefone, funcao) VALUES ($1, $2, $3, $4)", [nome, email, telefone, funcao]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.json(funcionarios);
  } catch (err) {
    res.json(err);
  }
};

const atualizarFuncionario = async (req, res) => {
  const { nome, email, telefone, funcao } = req.body;
  const id = req.params.id;
  try {
    await queryDB("UPDATE funcionarios SET nome = $1, email = $2, telefone = $3, funcao = $4 WHERE id = $5", [nome, email, telefone, funcao, id]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.json(funcionarios);
  } catch (err) {
    res.json(err);
  }
};

const deletarFuncionario = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM funcionarios WHERE id = $1", [id]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.json(funcionarios);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getFuncionarios,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
};
