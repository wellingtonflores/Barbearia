import bcrypt from "bcrypt";
import queryDB from "../utils/queryDB.js";

const selecionaUsuarioEmail = () => "SELECT * FROM usuarios WHERE email = $1";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await queryDB("SELECT * FROM usuarios");
    res.json(usuarios);
  } catch (error) {
    res.json(error);
  }
};

export const registrarUsuario = async (req, res) => {
  const { nome, email, whatsapp, senha } = req.body;
  try {
    const checkResult = await queryDB(selecionaUsuarioEmail(), [email]);
    if (checkResult.length > 0) {
      res.json("Email já existente, tente fazer login");
    } else {
      const senhaHashed = await bcrypt.hash(senha, 10);
      await queryDB(
        "INSERT INTO usuarios (nome, email, whatsapp, senha) VALUES($1, $2, $3, $4)",
        [nome, email, whatsapp, senhaHashed]
      );
      res.status(200).json("Usuário criado com sucesso");
    }
  } catch (err) {
    res.json(err);
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const resultado = await queryDB(selecionaUsuarioEmail(), [email]);
    if (resultado.length > 0) {
      const usuario = resultado[0];
      const match = await bcrypt.compare(senha, usuario.senha);
      if (match) {
        res.json("Logou");
      } else {
        res.json("Senha incorreta, tente novamente");
      }
    } else {
      res.json("Email não existe");
    }
  } catch (err) {
    console.log(err);
  }
};
