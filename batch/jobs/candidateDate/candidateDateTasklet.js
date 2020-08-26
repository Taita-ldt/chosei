const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const logger = require(appRoot + '/config/logger.js');
const candidateDate = db.candidate_date;

module.exports = {
  async setCandidateDate() {

    logger.debug("test");

    // 月日Insertメソッド
    const setDate = (month, date) => candidateDate.create(
      {
        candidate_month: month,
        candidate_date: date,
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
    try {
      await setDate('202009', '2020-09-09');
    } catch (error) {
      throw (error);
    }
  },
}