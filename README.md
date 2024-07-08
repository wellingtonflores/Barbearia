BarberShop API
Descrição
A BarberShop API é uma API RESTful que permite a gestão de uma barbearia. A API oferece endpoints para gerenciar usuários, barbeiros, serviços e agendamentos.

Endpoints
Usuários
GET /api/usuarios
Retorna uma lista de todos os usuários.
GET /api/usuarios/{id}
Retorna os detalhes de um usuário específico.
POST /api/usuarios
Cria um novo usuário.
POST /api/usuarios/registrar
Registra um usuario
POST/api/usuarios/login
Loga com um usuario
PUT /api/usuarios/{id}
Atualiza as informações de um usuário.
DELETE /api/usuarios/{id}
Remove um usuário.
GET /api/usuarios/perfil/agendamentos
Retorne os agendamentos do usuario logado
Barbeiros
GET /api/barbeiros
Retorna uma lista de todos os barbeiros.
GET /api/barbeiros/{id}
Retorna os detalhes de um barbeiro específico.
POST /api/barbeiros
Cria um novo barbeiro.
PUT /api/barbeiros/{id}
Atualiza as informações de um barbeiro.
DELETE /api/barbeiros/{id}
Remove um barbeiro.
Serviços
GET /api/servicos
Retorna uma lista de todos os serviços oferecidos.
GET /api/servicos/{id}
Retorna os detalhes de um serviço específico.
POST /api/servicos
Cria um novo serviço.
PUT /api/servicos/{id}
Atualiza as informações de um serviço.
DELETE /api/servicos/{id}
Remove um serviço.
Agendamentos
GET /api/agendamentos
Retorna uma lista de todos os agendamentos.
GET /api/agendamentos/{id}
Retorna os detalhes de um agendamento específico.
POST /api/agendamentos
Cria um novo agendamento.
PUT /api/agendamentos/{id}
Atualiza as informações de um agendamento.
DELETE /api/agendamentos/{id}
Remove um agendamento.

Como Usar
Requisitos
Node.js
npm
bcrypt
dotenv
express
jsonwebtoken

Configuração
Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente conforme necessário. Exemplo:

env
Copiar código
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=barbershop
Execução
Inicie o servidor:

bash
Copiar código
npm start
Acesse a API em http://localhost:4000/api.


Contribuição
Fork este repositório.
Crie uma branch: git checkout -b minha-nova-feature.
Faça suas alterações e commite: git commit -m 'Adiciona nova feature'.
Envie para o repositório remoto: git push origin minha-nova-feature.
Abra um pull request.
Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

