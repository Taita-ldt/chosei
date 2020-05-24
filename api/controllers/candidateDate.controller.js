const appRoot = require('app-root-path');
const getCandidateDateService = require(appRoot + '/service/candidateDate/getCandidateDate');
const getUserSetDateService = require(appRoot + '/service/candidateDate/getUserSetDate');
const setCandidateDateService = require(appRoot + '/service/candidateDate/setCandidateDate');
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  async getCandidateDate(req, res) {
    logger.info('Start getCandidateDateAPI');
    try {
      const response = await getCandidateDateService.getCandidateDate(req.params.month);
      res.status(200).send(response);
    } catch (error) {
      throw (error);
    } finally {
      logger.info('End getCandidateDateAPI');
    }
  },
  
  async getUserSetDate(req, res) {
    logger.info('Start findUserSetDataAPI');
    try {
      const response = await getUserSetDateService.getUserSetDate(req.query.month, req.query.user);
      res.send(response);
    } catch (error) {
      throw (error);
    } finally {
      logger.info('End findUserSetDataAPI');
    }
  },

  async setCandidateDate(req, res) {
    logger.info('Start setCandidateDateAPI');
    try {
      await setCandidateDateService.setCandidateDate(req.body.okStatusIds, req.body.sosoStatusIds, req.body.badStatusIds, req.params.id)
      res.status(200).send("Successfully updated a candidateDateStatus UserID: " + req.params.id);
    } catch (error) {
      throw (error);
    } finally {
      logger.info('End getCandidateDateAPI');
    }
  },
}