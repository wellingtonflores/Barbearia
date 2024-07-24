const pg = require("pg");

const db = new pg.Client({
  user: "barbeariadb_user",
  password: "2I37eKkZbRxCycrwHYaEe60cBZ5U5ZId",
  database: 'barbeariadb',
  host: 'dpg-cqggoht6l47c73bvg0f0-a.oregon-postgres.render.com',
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados com sucesso.");
  }
});

module.exports = db;
