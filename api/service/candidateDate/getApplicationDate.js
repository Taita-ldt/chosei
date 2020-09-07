const appRoot = require('app-root-path');
const getApplicationDateRepository = require(appRoot + '/repository/getApplicationDateRepository.js');

module.exports = {
  /**
   * 指定した月の上位2日の応募日を返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getApplicationDate(month) {
    res = [];
    const applicationDate = await getApplicationDateRepository.getApplicationDate(month);
    applicationDate[0].forEach(
      row => {
        const date  = {application_date_from: row.application_date_from, application_date_to: row.application_date_to};
        res.push(date);
      }
    );
    return ({"applicationDate" :res});      
  },
}