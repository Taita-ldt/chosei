const appRoot = require("app-root-path");
const db = require(appRoot + "/models/index.js");

module.exports = {
  /**
   * 指定した月の抽選ステータスを返す。
   * @param {string} month - "YYYYMM"の形式で年月を指定する。
   */
  getLotteryStatus(month) {
    return db.sequelize.query(
      "SELECT "
      + "lottery_status.id, "
      + "candidate_date.candidate_date, "
      + "to_char(lottery_status.candidate_time_from, 'HH24') as candidate_time, "
      + "lottery_status.lottery_status "
      + "FROM "
      + "candidate_date AS candidate_date "
      + "INNER JOIN "
      + "lottery_status AS lottery_status "
      + "ON candidate_date.id = lottery_status.candidate_date_id "
      + "WHERE "
      + "candidate_date.candidate_month = :month "
      + "GROUP BY "
      + "lottery_status.id, "
      + "candidate_date.candidate_date, "
      + "lottery_status.candidate_date_id, "
      + "lottery_status.candidate_time_from, "
      + "lottery_status.lottery_status "
      + "ORDER BY "
      + "lottery_status.id ASC "
      + ";",
      { raw: false, replacements: { month } }
    );
  },
}