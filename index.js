import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  password: "minhamae1",
  database: "barbearia",
  host: "localhost",
  port: 5432,
})
db.connect();


function selecionaUsuarioEmail(){
  return "SELECT * FROM usuarios WHERE email = $1";
}
//USUARIO
app.get("/api/usuarios", async (req, res) =>{
  try{
    const resultado = await db.query("SELECT * FROM usuarios");
    const usuarios = resultado.rows;
    selecionaUsuarioEmail();
    res.json(usuarios);
  }
  catch(error){
    console.log(error);
  }
});

app.post("/api/usuarios/registrar", async (req, res) => {
  const {nome, email, whatsapp, senha} = req.body;
  try {
    const checkResult = await db.query(selecionaUsuarioEmail(),[email]);
    if(checkResult.rows.length > 0){
      res.json("Email ja existente, tente fazer login");
    } else {
        const senhaHashed = await bcrypt.hash(senha, 10);
        db.query("INSERT INTO usuarios (nome, email, whatsapp, senha) VALUES($1, $2, $3, $4)",
        [nome, email, whatsapp, senhaHashed]);
        res.status(200).json("Usuario criado com sucesso");
    }
  } catch (err){
    res.json(err);
  }
});

app.post("/api/usuarios/login", async (req, res) => {
  const {email, senha} = req.body;
  try{
    const resultado = await db.query(selecionaUsuarioEmail(),[email],);
    if (resultado.rows.length > 0){
      const usuario = resultado.rows[0];
      const match = await bcrypt.compare(senha, usuario.senha);
      if (match){
        res.json("Logou");
      } else {
        res.json("Senha incorreta, tente novamente");
      }
    } else {
      res.json("Email não existe");
    }
  } catch (err){
    console.log(err);
  }
});

app.get("/api/usuarios/perfil", async (req, res) => {
  // ISSO VAI SER PARA MOSTRAR O PERFIL DO USUARIO LOGADO
});

app.patch("/api/usuarios/perfil", async (req, res) => {
  // ISSO VAI SER PRA ALTERAR O PERFIL DO USUARIO LOGADO
});

// SERViÇOS
app.get("/api/servicos", async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM servicos");
    res.json(resultado.rows); 
  } catch(err){
    res.json(err);
  }
});

app.post("/api/servicos", async (req, res) => {
  const { nome, preco } = req.body;
try{
  await db.query("INSERT INTO servicos (nome, preco) VALUES ($1, $2)",
  [nome, preco]);
  const resultado = await db.query("SELECT * FROM servicos");
  res.json(resultado.rows); 
} catch(err){
  res.json(err);
}
});

app.put("/api/servicos/:id", async (req, res) =>{
  const id = req.params.id;
  try {
    const servicosDB = await db.query("SELECT * FROM servicos");
    const servicos = servicosDB.rows.find((s) => s.id === parseInt(id));
    if(servicos){
      const { nome, preco } = req.body;
      try{
        await db.query("UPDATE servicos SET nome = $1, preco = $2 WHERE id = $3",[nome, preco, id]);
        const resultado = await db.query("SELECT * FROM servicos");
        res.json(resultado.rows);
      } catch (err){
        res.json(err);
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch(err){
    res.json(err);
  }
});

app.delete("/api/servicos/:id", async (req, res) =>{
  const id = req.params.id;
  try {
    await db.query("DELETE FROM servicos WHERE id = $1",[id]);
    const servicos = await db.query("SELECT * FROM servicos");
    res.json(servicos.rows);
  } catch (err){
    res.json(err);
  }
});

// FUNCIONARIOS
app.get("/api/funcionarios", async (req, res)=>{
  try{
    const resultado = await db.query("SELECT * FROM funcionarios");
    res.json(resultado.rows);
  } catch(err){
    res.json(err);
  }
});

app.post("/api/funcionarios", async (req, res) =>{
  const { nome, email, telefone, funcao } = req.body;
  try {
    await db.query("INSERT INTO funcionarios(nome, email, telefone, funcao) VALUES  ($1, $2, $3, $4)",
    [nome, email, telefone, funcao]);
    res.json("Funcionario criado com sucesso");
  } catch(err){
    res.json(err);
  }
});

app.put("/api/funcionarios/:id", async (req, res) =>{
  const id = req.params.id;
  try {
    const funcionariosDB = await db.query("SELECT * FROM funcionarios");
    const funcionarios = funcionariosDB.rows.find((f) => f.id === parseInt(id));
    if(funcionarios){
      const { nome, email, telefone, funcao} = req.body;
      try{
        await db.query("UPDATE funcionarios SET nome = $1, email = $2, telefone = $3, funcao = $4 WHERE id = $5",[nome, email, telefone, funcao, id]);
        const resultado = await db.query("SELECT * FROM funcionarios");
        res.json(resultado.rows);
      } catch (err){
        res.json(err);
      }
    } else {
      res.status(404).json({ message: "Funcionario não existente" });
    }
  } catch(err){
    res.json(err);
  }
});

app.delete("/api/funcionarios/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const funcionariosDB = await db.query("SELECT * FROM funcionarios");
    const funcionarios = funcionariosDB.rows.find((f) => f.id === parseInt(id));
    if(funcionarios){
      await db.query("DELETE FROM funcionarios WHERE id = $1",[id]);
      res.json("Funcionario Deletado com sucesso");
    }
    else{
      res.json("Funcionario não existente");
    }
    
  } catch(err){
    res.json(err);
  }
});

// AGENDAMENTOS
app.get("/api/agendamentos", async(req, res) =>{
  // ISSO VAI SER PRA MOSTRAR O AGENDAMENTO DO USUARIO LOGADO
  try{
    const resultado = await db.query("SELECT * FROM agendamentos");
    res.json(resultado.rows);
  } catch (err){
    console.log(err);
  }
});

app.post("/api/agendamentos", async(req, res) =>{
  try{
    const { usuariosId, funcionarioId, servicosId, data, horario, status } = req.body;
    await db.query("INSERT INTO agendamentos(usuarios_id, funcionarios_id, servicos_id, data, horario, status) VALUES($1, $2, $3, $4, $5, $6)",
      [usuariosId, funcionarioId, servicosId, data, horario, status]
    )
    res.json("Agendamento criado com sucesso");
  } catch (err){
    console.log(err);
  }
});

app.put("/api/agendamentos/:id", async (req, res) =>{
  // AQUI O USUARIO PODE MUDAR QUALQUER COISA DO AGENDAMENTO
  // FUTURAMENTE QUERO BOTAR PARA O USUARIO TROCAR SOMENTE DATA E HORARIO
  // E O ADM TROCAR O STATUS PARA CONCLUIDO
  const id = req.params.id;
  try {
    const agendamentosDB = await db.query("SELECT * FROM agendamentos");
    const agendamentos = agendamentosDB.rows.find((a) => a.id === parseInt(id));
    if(agendamentos){
      const { usuariosId, funcionarioId, servicosId, data, horario, status} = req.body;
      try{
        await db.query("UPDATE agendamentos SET usuarios_Id = $1, funcionarios_Id = $2, servicos_Id = $3, data = $4, horario = $5, status = $6 WHERE id = $7",
        [usuariosId, funcionarioId, servicosId, data, horario, status, id]);
        const resultado = await db.query("SELECT * FROM agendamentos")
        res.json(resultado.rows);
      } catch (err){
        console.log(err);
      }
    } else {
      res.status(404).json({ message: "Agendamento não existente" });
    }
  } catch(err){
    console.log(err);
  }
});

app.delete("/api/agendamentos/:id", async (req, res) =>{
  // GOSTARIA QUE SOMENTE ADM PODE DELETAR AGENDAMENTO 
  const id = req.params.id;
  try {
    const agendamentoDB = await db.query("SELECT * FROM agendamentos");
    const agendamento = agendamentoDB.rows.find((a) => a.id === parseInt(id));
    if(agendamento){
      try{
        await db.query("DELETE FROM agendamentos WHERE id = $1",[id]);
        res.json("Agendamento deletado com sucesso");
      } catch(err){
        console.log(err);
      }
    } else {
      res.json("Agendamento não existente");
    }
  } catch (err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});
