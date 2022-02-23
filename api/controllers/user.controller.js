const appRoot = require('app-root-path');
const userService = require(appRoot + '/service/user/userService');
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  async getUserList(req, res) {
    logger.info('Start getUserListAPI');
    try {
      const response = await userService.getUserList();
      res.status(200).send(response);
    } catch(error) {
      throw (error);
    } finally {
      logger.info('End getUserListAPI');
    }
  },
  async addUser(req, res) {
    logger.info('Start addUserAPI');
    try {
      const response = await userService.addUser(req.body.newUserName);
      res.status(200).send(response);
    } catch(error) {
      throw (error);
    } finally {
      logger.info('End addUserAPI');
    }
  },
  async deleteUser(req, res) {
    logger.info('Start deleteUserAPI');
    try {
      await userService.deleteUser(req.params.userId);
      res.send('OK')
    } catch(error) {
      throw (error);
    } finally {
      logger.info('End deleteUserAPI');
    }
  },
}