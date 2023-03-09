
const { version } = require('../../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Green House Emissions",
      description: "Green house emissions information via REST APIs",
      version,
    },
    servers: [
      {
        url: process.env.BASEURL,
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    "./src/models/*.js",
    "./src/middlewares/*.js",
  ],
};

 const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



