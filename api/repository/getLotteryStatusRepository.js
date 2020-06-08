const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');

module.exports = {
  /**
   * 指定した月の抽選ステータスを返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  getLotteryStatus(month) {
    return db.sequelize.query(
      'SELECT '
      + 'lottery_status.id, '
      + 'lottery_status.candidate_date_id, '
      + 'lottery_status.candidate_time_from, '
      + 'lottery_status.candidate_time_to, '
      + 'lottery_status.lottery_status '
      + 'FROM '
      + 'candidate_date AS candidate_date '
      + 'LEFT JOIN '
      + 'lottery_status AS lottery_status '
      + 'ON candidate_date.id = lottery_status.candidate_date_id '
      + 'WHERE '
      + 'candidate_date.candidate_month = :month '
      + 'GROUP BY '
      + 'lottery_status.id, '
      + 'lottery_status.candidate_date_id, '
      + 'lottery_status.candidate_time_from, '
      + 'lottery_status.candidate_time_to, '
      + 'lottery_status.lottery_status '
      + 'ORDER BY '
      + 'lottery_status.id ASC '
      + ';',
      { raw: false, replacements: { month } }
    );
  },
}