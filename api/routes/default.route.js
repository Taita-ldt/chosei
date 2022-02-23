module.exports = function (app) {

  const userController = require('../controllers/user.controller');
  const candidateDateController = require('../controllers/candidateDate.controller');
  const lotteryStatusController = require('../controllers/lotteryStatus.controller');
  const basePath = '/mng'
  const userAPI = `${basePath}/user`
  const dateAPI = `${basePath}/date`
  const lotteryStatusAPI = `${basePath}/lotteryStatus`

  // userAPI
  app.get(userAPI, userController.getUserList);
  app.post(userAPI, userController.addUser);
  app.delete(userAPI + '/:userId', userController.deleteUser);
  
  // dateAPI
  app.get(dateAPI + '/month/:month', candidateDateController.getCandidateDate);
  app.get(dateAPI + '/user', candidateDateController.getUserSetDate);
  app.patch(dateAPI + '/:id', candidateDateController.setCandidateDate);
  app.get(dateAPI + '/applicationDate/:month', candidateDateController.getApplicationDate);
  
  // lotteryStatusAPI
  app.get(lotteryStatusAPI + '/:month', lotteryStatusController.getLotteryStatus);
};