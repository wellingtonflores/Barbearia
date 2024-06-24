const bcrypt = require("bcrypt");
const queryDB = require("../utils/queryDB");
const { query } = require("express");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const selecionaUsuarioEmail = () => "SELECT * FROM usuarios WHERE email = $1";

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await queryDB("SELECT * FROM usuarios");
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const getPerfilUsuario = async (req, res) => {
  try {
    const { id, email, nome } = req.user;
    res.json({ id, email, nome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar perfil do usuario" });
  }
}

const getAgendamentosUsuario = async (req, res) => {
  try {
    const agendamentosUsuario = await queryDB(
      `SELECT usuarios.nome AS Nome_Completo, servicos.nome AS Nome_do_Serviço, 
      servicos.preco AS Preço_do_serviço, funcionarios.nome AS Nome_do_funcionario, 
      agendamentos.data AS data_do_agendamento, agendamentos.horario AS horario_do_agendamento 
      FROM agendamentos 
      JOIN usuarios ON usuarios.id = agendamentos.usuarios_id 
      JOIN servicos ON servicos.id = agendamentos.servicos_id 
      JOIN funcionarios ON funcionarios.id = agendamentos.funcionarios_id 
      WHERE usuarios.id = $1`, [req.user.id]
    );
    res.json(agendamentosUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar agendamentos do usuário" });
  }
}

const registrarUsuario = async (req, res) => {
  const { nome, email, whatsapp, senha } = req.body;
  try {
    const checkResult = await queryDB(selecionaUsuarioEmail(), [email]);
    if (checkResult.length > 0) {
      res.status(400).json("Email já existente, tente fazer login");
    } else {
      const senhaHashed = await bcrypt.hash(senha, 10);
      await queryDB(
        "INSERT INTO usuarios (nome, email, whatsapp, senha) VALUES($1, $2, $3, $4)",
        [nome, email, whatsapp, senhaHashed]
      );
      res.status(200).json("Usuário criado com sucesso");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const resultado = await queryDB(selecionaUsuarioEmail(), [email]);
    if (resultado.length > 0) {
      const usuario = resultado[0];
      const match = await bcrypt.compare(senha, usuario.senha);
      if (match) {
        const token = jwt.sign(
          {
            id: usuario.id, 
            email: usuario.email, 
            nome: usuario.nome 
          },
            secret,
          { 
            expiresIn 
          }
        );
        res.status(200).json({ mensagem: "Logado com sucesso", token});
      } else {
        res.status(400).json("Senha incorreta, tente novamente");
      }
    } else {
      res.status(404).json("Email não existe");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

module.exports = {
  getUsuarios,
  registrarUsuario,
  loginUsuario,
  getPerfilUsuario,
  getAgendamentosUsuario,
};