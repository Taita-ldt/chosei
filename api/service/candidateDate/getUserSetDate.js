const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const candidateDate = db.candidate_date;
const candidateDateStatus = db.candidate_date_status;

const logger = require(appRoot + '/config/logger.js');

module.exports = {
  async getUserSetDate(month, userId) {
    logger.info('start findUserSetDataAPI');
    // 今月の日程調整データがあるかfind
    await candidateDate.findOne({
      where: {
        candidate_month: month,
      },
      raw: true,
      include: [
        {
          model: db.candidate_date_status,
          required: true,  // INNER JOIN
          where: {
            user_id: userId
          },
        },
      ]
    }).then(async findData => {
      if (!findData) {
        // 日程調整していなかった場合、新規データを入れる
        await candidateDate.findAll({
          attributes: [
            'id'
          ],
          where: {
            candidate_month: month,
          },
          raw: true,
        })
          .then(async dateIds => {
            logger.debug(dateIds);
            await Promise.all(dateIds.map(async idObject => {
              await candidateDateStatus.create({
                user_id: userId,
                candidate_date_id: idObject.id,
                status: 1,
                created_at: new Date(),
                updated_at: new Date(),
              })
            }))
            logger.debug('insert date');
          })
      } else {
        logger.debug('update date');
      }
    })

    // 日程調整用データを返却
    return candidateDate.findAll({
      attributes: [
        'candidate_date'
      ],
      where: {
        candidate_month: month,
      },
      raw: true,
      include: [
        {
          model: db.candidate_date_status,
          required: true,  // INNER JOIN
          attributes: [
            'id',
            'status'
          ],
          where: {
            user_id: userId
          },
        },
      ],
      order: [
        ['candidate_date', 'asc'],
      ]
    })
  }
}