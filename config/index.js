var secret = require('./variables/secret.json'),
    custom = require('./variables/custom.json');

module.exports = {
  SLACK_BOT_TOKEN     : process.env.SLACK_BOT_TOKEN   || secret.SLACK_BOT_TOKEN,
  SLACK_WEBHOOK_URL   : process.env.SLACK_WEBHOOK_URL || secret.SLACK_WEBHOOK_URL,
  SLACK_CHANNEL       : process.env.CHANNEL           || custom.CHANNEL,
  
  BOT_WEBSERVER_PORT  : process.env.PORT              || custom.PORT,
};