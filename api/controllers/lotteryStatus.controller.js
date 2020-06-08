const appRoot = require('app-root-path');
const getLotteryStatusService = require(appRoot + '/service/lotteryStatus/getLotteryStatus');
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  /**
   * getLotteryStatusAPI | 抽選ステータス 取得
   * @param {*} req 
   * @param {*} res 
   */
  async getLotteryStatus(req, res) {
    logger.info('Start getLotteryStatusAPI');
    try {
      const response = await getLotteryStatusService.getLotteryStatus(req.params.month);
      res.status(200).send(response);
    } catch(error) {
      throw (error);
    } finally {
      logger.info('End getLotteryStatusAPI');
    }
  },
}