const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const models = require('./models/index.js');
const errorHandler = require('./config/errorHandler.js');
const app = express();
const logger = require('log4js').getLogger();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const serverless = require('serverless-http');
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: config.arrowFrontUrl,
  optionsSuccessStatus: 200
}

app.set('port', port);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// cors対策
app.use(cors(corsOptions));

models.sequelize.sync().then(() => {
  logger.info('Start chousei-api');
}).catch((err) => {
  logger.error('Something went wrong with the operation: ' + err);
});

require('./routes/default.route')(app);

// エラーログ出力 
app.use(errorHandler.logErrors);

// REST API用のエラーハンドラ(ここでは、/apiがAPIの想定)
app.use('/mng', errorHandler.clientErrorHandler);

// エラーベージ表示用エラーハンドラ
app.use(errorHandler.errorHandler);


const server = http.createServer(app);
server.listen(port);
module.exports = app;

module.exports.handler = serverless(app); 