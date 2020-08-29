const batch = require('./jobs/index.js');
const logger = require('log4js').getLogger();
const moment = require('moment');

(async function () {


  logger.info("*********************************************");
  logger.info("* バッチ名 : ", process.argv[2]);
  logger.info("* 開始時刻 : ", moment().format('YYYY/MM/DD_HH:mm:ss'));
  logger.info("*********************************************");
  try {
    await batch[process.argv[2]].doProcess();
  } catch (e) {
    logger.error('Something went wrong with the operation: ' + err);
  }

  logger.info("*********************************************");
  logger.info("* バッチ名 : ", process.argv[2]);
  logger.info("* 終了時刻 : ", moment().format('YYYY/MM/DD_HH:mm:ss'));
  logger.info("*********************************************");

}())