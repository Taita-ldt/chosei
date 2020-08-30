const appRoot = require('app-root-path');
const getApplicationDateRepository = require(appRoot + '/repository/getApplicationDateRepository.js');

module.exports = {
  /**
   * 指定した月の上位2日の応募日と倍率を返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getApplicationDate(month) {
    // const res = {}
    const result = await getApplicationDateRepository.getApplicationDate(month);
    console.log(result[0]);
//     return result[0].forEach(row => {
//       const applicationDate = row.application_date;
//       const magnification = row.magnification;
//       this.res.push({ applicationDate: applicationDate, magnification: magnification });
// });
    return result[0];      
    // return { "applicationDate": result[0]['application_date'], "magnification": result[0]['magnification'] };      
  },
}