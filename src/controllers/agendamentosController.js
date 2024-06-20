import queryDB from "../../utils/queryDB.js";
import db from "../../models/db.js"

export const getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await db.queryDB("SELECT * FROM agendamentos");
    res.json(agendamentos);
  } catch (err) {
    res.json(err);
  }
};

export const criarAgendamento = async (req, res) => {
  const { usuarios_id, funcionarios_id, servicos_id, data, horario, status } = req.body;
  try {
    await db.query("INSERT INTO agendamentos (usuarios_id, funcionarios_id, servicos_id, data, horario, status) VALUES ($1, $2, $3, $4, $5, $6)", 
        [usuarios_id, funcionarios_id, servicos_id, data, horario, status]);
    const agendamentos = await queryDB("SELECT * FROM agendamentos");
    res.json(agendamentos);
  } catch (err) {
    console.log(err);
  }
};

export const atualizarAgendamento = async (req, res) => {
  const { usuarios_id, funcionarios_id, servicos_id, data, horario, status } = req.body;
  const id = req.params.id;
  try {
    await queryDB("UPDATE agendamentos SET usuarios_Id = $1, funcionarios_Id = i2, servicos_id = $3, data = $4, horario = $5, status = $6 WHERE id = $7", [usuarios_id, funcionarios_id, servicos_id, data, horario, status, id]);
    const agendamentos = await queryDB("SELECT * FROM agendamentos");
    res.json(agendamentos);
  } catch (err) {
    res.json(err);
  }
};

export const deletarAgendamento = async (req, res) => {
  const id = req.params.id;
  try {
    await queryDB("DELETE FROM agendamentos WHERE id = $1", [id]);
    const agendamentos = await queryDB("SELECT * FROM agendamentos");
    res.json(agendamentos);
  } catch (err) {
    res.json(err);
  }
};
