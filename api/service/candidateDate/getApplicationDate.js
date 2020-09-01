const appRoot = require('app-root-path');
const getApplicationDateRepository = require(appRoot + '/repository/getApplicationDateRepository.js');

module.exports = {
  /**
   * 指定した月の上位2日の応募日を返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getApplicationDate(month) {
    const applicationDate = await getApplicationDateRepository.getApplicationDate(month);
    return {"applicationDate" :applicationDate[0]};      
  },
}