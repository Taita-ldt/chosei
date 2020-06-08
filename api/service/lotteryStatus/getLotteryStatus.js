const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const getLotteryStatusRepository = require(appRoot + '/repository/getLotteryStatusRepository.js');


module.exports = {
  /**
   * 指定した月の抽選ステータスを返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getLotteryStatus(month) {
    const lotteryStatus = await getLotteryStatusRepository.getLotteryStatus(month);
    return { "lotteryStatus": lotteryStatus[0] };
  },
}