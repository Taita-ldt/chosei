module.exports = function (app) {
  const appRoot = require('app-root-path');
  const candidateDate = require(appRoot + '/jobs/candidateDate/candidateDateTasklet.js');

  candidateDate.setCandidateDate();

};