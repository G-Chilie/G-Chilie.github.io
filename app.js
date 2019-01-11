
var express = require('express');
var swaggerUi = require('swagger-ui-express');
var logger = require('./server/lib/logger');
var routes = require('./server/routes/index');

var docs = require('./swagger.json');

var app = express();
var port = process.env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use('/', swaggerUi.serve, swaggerUi.setup(docs));

if (!module.parent) {
  app.listen(port, function () {
    logger.info('app running at port ' + port);
  });
}

module.exports = app;