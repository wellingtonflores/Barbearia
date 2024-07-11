const queryDB = require("../utils/queryDB");

const getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.status(200).json(funcionarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
};

const criarFuncionario = async (req, res) => {
  const { nome, email, telefone, funcao } = req.body;
  try {
    await queryDB("INSERT INTO funcionarios (nome, email, telefone, funcao) VALUES ($1, $2, $3, $4)", [nome, email, telefone, funcao]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.status(201).json({ message: "Funcionario criado com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
};

const atualizarFuncionario = async (req, res) => {
  const { nome, email, telefone, funcao } = req.body;
  const id = req.params.id;
  try {
    const funcionarioAtual = await queryDB("SELECT * FROM funcionarios WHERE id = $1", [id]);
    if (funcionarioAtual.length === 0) {
      return res.status(404).json({ error: "Funcionario não encontrado" });
    }
    const nomeAtualizado = nome || funcionarioAtual[0].nome;
    const emailAtualizado = email || funcionarioAtual[0].email;
    const telefoneAtualizado = telefone || funcionarioAtual[0].telefone;
    const funcaoAtualizada = funcao || funcionarioAtual[0].funcao;
    await queryDB("UPDATE funcionarios SET nome = $1, email = $2, telefone = $3, funcao = $4 WHERE id = $5", [nomeAtualizado, emailAtualizado, telefoneAtualizado, funcaoAtualizada, id]);
    const funcionarioAtualizado = await queryDB("SELECT * FROM funcionarios WHERE id = $1", [id]);
    res.status(200).json(funcionarioAtualizado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
};

const deletarFuncionario = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM funcionarios WHERE id = $1", [id]);
    const funcionarios = await queryDB("SELECT * FROM funcionarios");
    res.status(200).json({ message: "Funcionario deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar funcionário" });
  }
};

module.exports = {
  getFuncionarios,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
};
