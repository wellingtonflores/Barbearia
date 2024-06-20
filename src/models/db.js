require("dotenv").config()
const pg = require("pg");


const db = new pg.Client({
  user: process.env.userDB,
  password: process.env.passwordDB,
  database: process.env.DB,
  host: process.env.hostDB,
  port: process.env.portDB,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados com sucesso.");
  }
});

module.exports = db;
