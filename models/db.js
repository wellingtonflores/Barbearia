import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  password: "minhamae1",
  database: "barbearia",
  host: "localhost",
  port: 5432,
});

db.connect();

export default db;