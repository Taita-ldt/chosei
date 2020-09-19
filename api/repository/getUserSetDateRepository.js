const appRoot = require("app-root-path");
const db = require(appRoot + "/models/index.js");
const candidateDate = db.candidate_date;
const candidateDateStatus = db.candidate_date_status;
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  /**
   * 指定した月,ユーザの日程調整結果を返す。ユーザIDを指定しない場合、候補日を全て返す。
   * @param {string} month - "YYYYMM"の形式で年月を指定する。
   * @param {string} userId
   */
  getCandidateDate(month, userId) {
    const query = {
      attributes: ['id','candidate_date'],
      where: {candidate_month: month},
      order: [['candidate_date', 'asc']],
      raw: true
    }
    logger.debug(userId);
    if (userId !== void 0) {
      query.include = [
        {
          model: db.candidate_date_status,
          required: true,
          attributes: ['id','status'],
          where: {user_id: userId},
        },
      ];
    }
    return candidateDate.findAll(query)
  },
  setCandidateDateStatus(candidateDateIds, userId) {
    Promise.all(candidateDateIds.map(async candidateDateId => {
      await candidateDateStatus.create({
        user_id: userId,
        candidate_date_id: candidateDateId,
        status: 0,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }))
  }
}