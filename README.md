<h1 align="center" style="font-weight: bold;">Barbearia do Tim 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>A Barbearia do Tim API é uma API RESTful que permite a gestão de uma barbearia. A API oferece endpoints para gerenciar usuários, barbeiros, serviços e agendamentos.
</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NodeJS
- PostgreeSQL

<h2 id="started">🚀 Getting started</h2>

```
cd Barbearia
npm install
```


<h3>Prerequisites</h3>


- [NodeJS](https://github.com/)
- [Git 2](https://github.com)   
- [PostgreSQL](https://www.postgresql.org)

<h3>Cloning</h3>


```bash
git https://github.com/wellingtonflores/Barbearia
```

<h3>Config .env variables</h2>


```yaml
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=barbershop
```

<h3>Starting</h3>

How to start your project

```bash
cd Barbearia
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /api/usuarios</kbd>     | retorna a lista de todos os usuarios 
  <kbd>GET /api/perfil</kbd>     | retorna o perfil do usuario logado com id, nome e email.
  <kbd>GET /api/perfil/agendamentos</kbd>     | retorna todos os agendamentos do usuario logado.
| <kbd>POST /api/registrar</kbd>     | registra o usuario no DB caso os dados estejam corretos.
  <kbd>POST /api/login</kbd>     | loga o usuario caso os dados estejam certo e retorna um token bearer.
  <kbd>PATCH /api/perfil</kbd>     | atualiza o nome do usuario logado caso esteja tudo correto.
|----------------------|-----------------------------------------------------
  <kbd>GET /api/servicos</kbd>     | retorna a lista de todos os serviços 
  <kbd>POST /api/servicos</kbd>     | cria um novo serviço.
  <kbd>PUT /api/servicos/:id</kbd>     | edita o serviço de acordo com o id fornecido se os dados estiverem corretos.
| <kbd>DELETE /api/servicos/:id</kbd>     | deleta serviço de acordo com o id fornecido.
|----------------------|-----------------------------------------------------
  <kbd>GET /api/funcionarios</kbd>     | retorna a lista de todos os funcionarios. 
  <kbd>POST /api/funcionarios</kbd>     | cria um novo funcionario. 
  <kbd>PATCH /api/funcionarios/:id</kbd>     | edita um funcionario de acordo com id passado e edita se estiver todos os dados corretos. 
  <kbd>DELETE /api/funcionarios:id</kbd>     | deleta um funcionario de acordo com o id passado. 
|----------------------|-----------------------------------------------------
  <kbd>GET /api/agendamentos</kbd>     | retorna a lista de todos os funcionarios.
  <kbd>POST /api/agendamentos</kbd>     | cria um novo funcionario.
  <kbd>PUT /api/agendamentos/:id</kbd>     | edita um agendamento de acordo com id passado e edita se estiver todos os dados corretos.
  <kbd>DELETE /api/agendamentos:id</kbd>     | deleta um agendamento de acordo com o id passado.
 

<h3>GET /api/usuarios</h3>

**RESPONSE**
```json
{
  "name": "Wellington Flores",
  "age": 23,
  "email": "wellington@gmail.com"
}
```

<h3>GET /api/perfil</h3>

**RESPONSE**
```json
  {
  "id": 1,
  "nome": "Wellington Flores",
  "email": "wellington@gmail.com"
}
```

<h3>GET /api/perfil/agendamentos</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "data_hora": "2024-07-12T10:00:00",
    "servico": "Corte de Cabelo",
    "funcionario": "Carlos Pereira"
  },
  {
    "id": 2,
    "data_hora": "2024-07-15T15:30:00",
    "servico": "Barba",
    "funcionario": "Ana Souza"
  }
]
```

<h3>POST /api/registrar</h3>

**REQUEST**
```json
{
  "nome": "Wellington Flores",
  "email": "wellington@gmail.com",
  "senha": "senha123",
  "whatsapp": "11987654321"
}
```

**RESPONSE**
```json
{
  "message": "Usuario criado com sucesso",
}
```

<h3>POST /api/login</h3>

**REQUEST**
```json
{
  "username": "wellingtonflores",
  "password": "123"
}
```

**RESPONSE**
```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```

<h3>PATCH /api/perfil</h3>

**REQUEST**
```json
{
  "nome": "Wellington Silva"
}
```

**RESPONSE**
```json
{
  "message": "Usuario com o nome trocado com sucesso",
}
```

<h3>GET /api/servicos</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "nome": "Corte de Cabelo",
    "preco": 30.00
  },
  {
    "id": 2,
    "nome": "Barba",
    "preco": 20.00
  }
]
```

<h3>POST /api/servicos</h3>

**REQUEST**
```json
{
  "nome": "Manicure",
  "preco": 25.00
}
```

**RESPONSE**
```json
{
  "message": "Serviço criado com sucesso",
}
```

<h3>PUT /api/servicos</h3>

**REQUEST**
```json
{
  "nome": "Corte de Cabelo Masculino",
  "preco": 35.00
}
```

**RESPONSE**
```json
{
  "message": "Serviço alterado com sucesso",
}
```

<h3>DELETE /api/servicos</h3>

**REQUEST**
```json
(No body content)
```

**RESPONSE**
```json
{
  "message": "Serviço deletado com sucesso",
}
```

<h3>GET /api/funcionarios</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "nome": "Carlos Pereira",
    "email": "carlos@example.com",
    "telefone": "11987654323",
    "especialidade": "Corte de Cabelo"
  },
  {
    "id": 2,
    "nome": "Ana Souza",
    "email": "ana@example.com",
    "telefone": "11987654324",
    "especialidade": "Barba"
  }
]
```

<h3>POST /api/funcionarios</h3>

**REQUEST**
```json
{
  "nome": "Pedro Santos",
  "email": "pedro@example.com",
  "telefone": "11987654325",
  "funcao": "Manicure"
}
```

**RESPONSE**
```json
{
  "message": "Funcionario criado com sucesso",
}
```

<h3>PATCH /api/funcionarios</h3>

**REQUEST**
```json
{
  "nome": "Carlos Pereira Silva"
}
```

**RESPONSE**
```json
{
  {
    "id": 1,
    "nome": "Carlos Pereira Atualizado",
    "email": "carlos@example.com",
    "telefone": "11987654323",
    "especialidade": "Corte de Cabelo"
  },
}
```


<h3>DELETE /api/funcionarios</h3>

**REQUEST**
```json
(No body content)
```

**RESPONSE**
```json
{
 "message": "Funcionario deletado com sucesso",
}
```

<h3>GET /api/agendamentos</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "data_hora": "2024-07-12T10:00:00",
    "usuario": "Wellington Flores",
    "servico": "Corte de Cabelo",
    "funcionario": "Carlos Pereira"
  },
  {
    "id": 2,
    "data_hora": "2024-07-15T15:30:00",
    "usuario": "Maria Oliveira",
    "servico": "Barba",
    "funcionario": "Ana Souza"
  }
]
```

<h3>POST /api/agendamentos</h3>

**REQUEST**
```json
{
  "usuarios_id": 1,
  "servicos_id": 1,
  "funcionarios_id": 1,
  "data_hora": "2024-07-20T14:00:00"
}
```
**RESPONSE**
```json
  {
    "msg": "Agendamento criado com sucesso"
  }

```


<h3>PUT /api/agendamentos</h3>

**REQUEST**
```json
{
  "data_hora": "2024-07-20T15:00:00"
}
```

**RESPONSE**
```json
  {
    "msg": "Agendamento atualizado com sucesso"
  }

```

<h3>DELETE /api/agendamentos</h3>

**REQUEST**
```json
(No body content)
```

**RESPONSE**
```json
  {
    "msg": "Agendamento deletado com sucesso"
  }

```

<h2 id="contribute">📫 Contribute</h2>


1. `git clone https://github.com/wellingtonflores/Barbearia`
2. `git checkout -b feature/Barbearia`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
