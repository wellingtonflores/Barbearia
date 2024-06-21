// config/session.js

const session = require("express-session");

const sessionConfig = {
  secret: "secreto", // Chave secreta para assinar a sessão (mantenha isso seguro em um ambiente de produção)
  resave: false, // Evita salvar sessões não modificadas
  saveUninitialized: false, // Evita salvar sessões que não foram inicializadas
  cookie: {
    secure: false, // Se true, o cookie só será enviado em conexões HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Tempo de vida do cookie da sessão em milissegundos (aqui: 1 dia)
  },
};

module.exports = session(sessionConfig);