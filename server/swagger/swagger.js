const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const swaggerDoc = yaml.safeLoad(fs.readFileSync('./swagger/swagger.yml', 'utf8'));

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDoc),
};