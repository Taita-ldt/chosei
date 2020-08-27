const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const logger = require(appRoot + '/config/logger.js');
const candidateDate = db.candidate_date;

module.exports = {
  async setCandidateDate() {

    logger.debug("test");
    const monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1) % 12;
    const isLeapYear = y => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    const isSatOrSun = d => d.getDay() == 0 || d.getDay() == 6;
    // TODO 祝日判定
    const isHoriday = d => true;
    
    const fill_0 = num => num < 10 ? `0${num}` : `${num}`
    const candidate_month = `${year}${fill_0(month + 1)}`;

    // 月日Insertメソッド
    const setDate = (month, date) => candidateDate.create(
      {
        candidate_month: month,
        candidate_date: date,
        created_at: now,
        updated_at: now,
      }
    );

    if (isLeapYear(year) && month === 1) monthDate[1] = 29;

    try {
      let date = '';
      for (let day = 1; day <= monthDate[month]; day++){
        date = new Date(year, month, day);
        if (isSatOrSun(date) || isHoriday(date)) await setDate(candidate_month, date);
      }
    } catch (error) {
      throw (error);
    }
  },
}