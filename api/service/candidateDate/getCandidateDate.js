const appRoot = require('app-root-path');
const getRespondentRepository = require(appRoot + '/repository/getRespondentRepository.js');
const getCandidateDateRepository = require(appRoot + '/repository/getCandidateDateRepository.js');

module.exports = {
  /**
   * 指定した月の候補日と回答者データを返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  async getCandidateDate(month) {
    const user = await getRespondentRepository.getRespondent(month);
    const date = await getCandidateDateRepository.getCandidateDate(month);
    return {"date": date[0], "user": user[0]};
  },
}