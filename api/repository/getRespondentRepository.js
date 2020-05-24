const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');

module.exports = {
  /**
   * 指定した月の回答者データを返す。
   * @param {string} month - 'YYYYMM'の形式で年月を指定する。
   */
  getRespondent(month) {
    return db.sequelize.query(
      'SELECT '
      + 'chousei_user.id AS user_id, '
      + 'chousei_user.name AS user_name '
      + 'FROM '
      + '( '
      + 'SELECT '
      + 'candidate_date_statuses.user_id AS user_id '
      + 'FROM '
      + 'candidate_date AS candidate_date '
      + 'LEFT JOIN '
      + 'candidate_date_status AS candidate_date_statuses '
      + 'ON candidate_date.id = candidate_date_statuses.candidate_date_id '
      + 'WHERE '
      + 'candidate_date.candidate_month = :month '
      + 'GROUP BY '
      + 'candidate_date_statuses.user_id '
      + ') AS T1 '
      + 'LEFT JOIN '
      + 'chousei_user '
      + 'ON  chousei_user.id = T1.user_id;',
      { raw: false, replacements: { month } }
    );
  },
}