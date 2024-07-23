
const pg = require("pg");


const db = new pg.Client({
  user: "postgres",
  password: "123456",
  database: 'barbearia',
  host: 'localhost',
  port: '5432',
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados com sucesso.");
  }
});

module.exports = db;
