const appRoot = require('app-root-path');
const getUserSetDateRepository = require(appRoot + '/repository/getUserSetDateRepository.js');

module.exports = {
  async getUserSetDate(month, userId) {
    // 今月の日程調整データがあるかfind
    let res = {};
    await getUserSetDateRepository.getCandidateDate(month, userId)
      .then(async findData => {
        if (findData.length === 0) {
          // 日程調整していなかった場合、新規データを入れる
          await getUserSetDateRepository.getCandidateDate(month)
            .then(async dateList => {
              const candidateDateIds = dateList.map(o => o.id);
              await getUserSetDateRepository.setCandidateDateStatus(candidateDateIds, userId)
              res = await getUserSetDateRepository.getCandidateDate(month, userId);
            })
        } else {
          res = findData;
        }
      })
    return {"data" : res};
  }
}