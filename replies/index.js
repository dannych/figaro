var customerService = require('../library/customer-service'),
    utility = require('../library/utility');

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
    bot.reply(message,utility.randomize(message.match[1]));
  });

  controller.hears(['roll'],['direct_message','direct_mention','mention'], function(bot,message) {
    bot.reply(message,utility.roll(message.match[1]));
  });
};