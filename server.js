const express = require('express');
const logger = require('./app/lib/logger');
const routes = require('./app/routes/index');

const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (!module.parent) {
  app.listen(port, () => {
    logger.info(`app running at port ${port}`);
  });
}

module.exports = app;
