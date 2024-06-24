const queryDB = require("../utils/queryDB")

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
    const funcionarioAtual = await queryDB("SELECT * FROM funcionarios WHERE id = $1",[id]);
    if(!funcionarioAtual){
      return res.status(404).json({ error: "Funcionario não encontrado" });
    }
    const nomeAtualizado = nome || funcionarioAtual.nome;
    const emailAtualizado = email || funcionarioAtual.email;
    const telefoneAtualizado = telefone || funcionarioAtual.telefone;
    const funcaoAtualizada = funcao || funcionarioAtual.funcao;
    await queryDB("UPDATE funcionarios SET nome = $1, email = $2, telefone = $3, funcao = $4 WHERE id = $5", [nomeAtualizado, emailAtualizado, telefoneAtualizado, funcaoAtualizada, id]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios WHERE id = $1",[id]);
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
