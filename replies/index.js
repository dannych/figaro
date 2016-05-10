var customerService = require('../library/customer-service');

module.exports = function(bot, controller) {
  controller.setupWebserver(process.env.PORT,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver);
  });
  bot.configureIncomingWebhook({url: 'https://hooks.slack.com/services/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'});

  controller.hears(['whoiscs'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,customerService.getTodayCs());
  });

  controller.hears(['whoisnextcs'],['direct_message','direct_mention','mention'],function(bot,message) {
      bot.reply(message,customerService.getTomorrowCs());
  });
};