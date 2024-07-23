const queryDB = require("../utils/queryDB");

const getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await queryDB("SELECT * FROM agendamentos");
    res.status(200).json(agendamentos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
};

const criarAgendamento = async (req, res) => {
  const usuario_id = req.user.id
  const { funcionarios_id, servicos_id, data, hora, } = req.body;
  try {
    await queryDB("INSERT INTO agendamentos (usuarios_id, funcionarios_id, servicos_id, data, hora) VALUES ($1, $2, $3, $4, $5)", [usuario_id, funcionarios_id, servicos_id, data, hora]);
    res.status(201).json({msg: "Agendamento criado com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
};

const atualizarAgendamento = async (req, res) => {
  const { funcionarios_id, servicos_id, data, horario, status } = req.body;
  const usuario_id = req.user
  const id = req.params.id;
  try {
    await queryDB("UPDATE agendamentos SET usuarios_id = $1, funcionarios_id = $2, servicos_id = $3, data = $4, horario = $5, status = $6 WHERE id = $7", [usuario_id, funcionarios_id, servicos_id, data, horario, status, id]);
    res.status(200).json({msg: "Agendamento atualizado com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
};

const deletarAgendamento = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM agendamentos WHERE id = $1", [id]);
    res.status(200).json({msg: "Agendamento deletado com sucesso"});
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar agendamento" });
  }
};

module.exports = {
  getAgendamentos,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
};
