const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Barbearia do Tim',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de barbearia',
    },
    servers: [
      {
        url: 'http://localhost:4000/', // URL para desenvolvimento local
        description: 'Servidor local',
      },
      {
        url: 'https://barbearia-hyi0.onrender.com/', // URL de produção ou outro ambiente
        description: 'Servidor de Produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
});

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
