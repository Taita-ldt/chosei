const appRoot = require('app-root-path');
const getApplicationDateRepository = require(appRoot + '/repository/getApplicationDateRepository.js');

module.exports = {
  /**
   * 指定した月の上位2日の応募日と倍率を返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getApplicationDate(month) {
    const result = await getApplicationDateRepository.getApplicationDate(month);
    return result[0];      
  },
}