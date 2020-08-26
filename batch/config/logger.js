const logger = require('log4js').getLogger();
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];
logger.level = config.loggerLevel;

module.exports = logger;