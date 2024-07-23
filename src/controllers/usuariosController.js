const bcrypt = require("bcrypt");
const queryDB = require("../utils/queryDB");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const selecionaUsuarioEmail = () => "SELECT * FROM usuarios WHERE email = $1";

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await queryDB("SELECT * FROM usuarios");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const getPerfilUsuario = async (req, res) => {
  try {
    const { id, email, nome, whatsapp, senha } = req.user;
    res.status(200).json({ id, email, nome, whatsapp, senha });

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfil do usuario" });
  }
}

const getAgendamentosUsuario = async (req, res) => {
  try {
    const agendamentosUsuario = await queryDB(
      `SELECT usuarios.nome AS Nome_Completo, servicos.nome AS Nome_do_Serviço, 
      servicos.preco AS Preço_do_serviço, funcionarios.nome AS Nome_do_funcionario, 
      agendamentos.data AS data_do_agendamento, agendamentos.hora AS horario_do_agendamento 
      FROM agendamentos 
      JOIN usuarios ON usuarios.id = agendamentos.usuarios_id 
      JOIN servicos ON servicos.id = agendamentos.servicos_id 
      JOIN funcionarios ON funcionarios.id = agendamentos.funcionarios_id 
      WHERE usuarios.id = $1`, [req.user.id]
    );
    res.status(200).json(agendamentosUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar agendamentos do usuário" });
  }
}

const registrarUsuario = async (req, res) => {
  const { nome, email, whatsapp, senha } = req.body;
  try {
    const checkResult = await queryDB(selecionaUsuarioEmail(), [email]);
    if (checkResult.length > 0) {
      res.status(400).json({ error: "Email já existente, tente fazer login" });
    } else {
      const senhaHashed = await bcrypt.hash(senha, 10);
      await queryDB(
        "INSERT INTO usuarios (nome, email, whatsapp, senha) VALUES($1, $2, $3, $4)",
        [nome, email, whatsapp, senhaHashed]
      );
      res.status(201).json({ message: "Usuário criado com sucesso" });
    }
  } catch (err) {
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
            nome: usuario.nome,
            whatsapp: usuario.whatsapp,
            senha: usuario.senha
          },
            secret,
          { 
            expiresIn 
          }
        );
        res.status(200).json({ message: "Logado com sucesso", token });
      } else {
        res.status(400).json({ error: "Senha incorreta, tente novamente" });
      }
    } else {
      res.status(404).json({ error: "Email não existe" });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

const atualizaNomeUsuario = async (req, res) =>{
  const usuarioId = req.user.id
  const usuarioNovoNome  = req.body.nome
  try {
    if (!usuarioNovoNome) {
      return res.status(400).json({ error: "Novo nome obrigatório" }); 
    }
    await queryDB("UPDATE usuarios SET nome = $1 WHERE usuarios.id = $2",[usuarioNovoNome, usuarioId]);
    res.status(200).json({ message: "Usuario com o nome trocado com sucesso"});
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar nome do usuario "});
  }
}

module.exports = {
  getUsuarios,
  registrarUsuario,
  loginUsuario,
  getPerfilUsuario,
  getAgendamentosUsuario,
  atualizaNomeUsuario,
};
