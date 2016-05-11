var customerService = require('../library/customer-service'),
    randomizer = require('../library/randomize');

module.exports = function(bot, controller, config) {
  controller.setupWebserver(config.BOT_WEBSERVER_PORT,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver);
  });
  bot.configureIncomingWebhook({url: config.SLACK_WEBHOOK_URL});

  controller.hears(['whoiscs'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,customerService.getTodayCs());
  });

  controller.hears(['whoisnextcs'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,customerService.getNextCs());
  });
  
  controller.hears(['randomize (.*)'],['direct_message','direct_mention','mention'], function(bot,message) {
    bot.reply(message,randomizer.randomize(message.match[1]));
  });
};