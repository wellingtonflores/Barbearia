<h1 align="center" style="font-weight: bold;">Barbearia do Tim 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
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

cd Barbearia
npm i


<h3>Prerequisites</h3>


- [NodeJS](https://github.com/)
- [Git 2](https://github.com)   

<h3>Cloning</h3>

How to clone your project

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
| <kbd>GET /api/usuarios</kbd>     | retorna a lista de todos os usuarios [response details](#get-user-detail)
| <kbd>POST /api/login</kbd>     | loga o usuario caso os dados estejam certo e retorna um token bearer [request details](#post-login-detail)

<h3 id="get-auth-detail">GET /api/usuarios</h3>

**RESPONSE**
```json
{
  "name": "Wellington Flores",
  "age": 23,
  "email": "wellington@gmail.com"
}
```

<h3 id="post-auth-detail">POST /api/login</h3>

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

<h2 id="contribute">📫 Contribute</h2>


1. `git clone https://github.com/wellingtonflores/Barbearia`
2. `git checkout -b feature/Barbearia`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
