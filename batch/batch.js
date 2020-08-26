const appRoot = require('app-root-path');
const candidateDate = require(appRoot + '/jobs/candidateDate/candidateDateTasklet.js');
const logger = require(appRoot + '/config/logger.js');

candidateDate.setCandidateDate();