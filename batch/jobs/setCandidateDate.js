const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const logger = require(appRoot + '/config/logger.js');
const candidateDate = db.candidate_date;
const moment = require('moment');
const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: 'https://holidays-jp.github.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

module.exports = {
  async doProcess() {
    const monthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const nextMonth = moment().add(1, 'months');
    const year = nextMonth.year();
    const month = (nextMonth.month()) % 12;
    const horiday = await axios.get(`/${year}/date.json`);

    // うるう年判定
    const isLeapYear = y => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    // 土日判定
    const isSatOrSun = d => d.day() == 0 || d.day() == 6;
    // 祝日判定
    const isHoriday = date => horiday.data[date.format("YYYY-MM-DD")] !== void 0;
    // 月日Insertメソッド
    const setDate = (month, date) => candidateDate.create(
      {
        candidate_month: month,
        candidate_date: date,
        created_at: new Date(),
        updated_at: new Date(),
      }
    );

    if (isLeapYear(year) && month === 1) monthDate[1] = 29;

    try {
      let date = '';
      let candidate_month = '';
      let candidate_date = '';
      for (let day = 1; day <= monthDate[month]; day++){
        date = moment([year, month, day]);
        if (isSatOrSun(date) || isHoriday(date)) {
          candidate_month = nextMonth.format("YYYYMM");
          candidate_date = date.tz("Asia/Tokyo").format("YYYY-MM-DD");
          await setDate(candidate_month, candidate_date);
        }
      }
    } catch (error) {
      throw (error);
    }
  },
}