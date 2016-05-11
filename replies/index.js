var customerService = require('../library/customer-service');

module.exports = function(bot, controller, config) {
  controller.setupWebserver(process.env.PORT,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver);
  });
  bot.configureIncomingWebhook({url: config.SLACK_WEBHOOK_URL});

  controller.hears(['whoiscs'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,customerService.getTodayCs());
  });

  controller.hears(['whoisnextcs'],['direct_message','direct_mention','mention'],function(bot,message) {
      bot.reply(message,customerService.getNextCs());
  });
};