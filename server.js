const express = require('express');
const swaggerUi = require('swagger-ui-express');
const logger = require('./app/lib/logger');
const routes = require('./app/routes/index');

const docs = require('./swagger.json');


const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.use('/', swaggerUi.serve, swaggerUi.setup(docs));


if (!module.parent) {
  app.listen(port, () => {
    logger.info(`app running at port ${port}`);
  });
}

module.exports = app;
