const logger = require('log4js').getLogger();

module.exports = {

  // エラーログ出力
  logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
  },
}