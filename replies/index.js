var customerService = require('../library/customer-service');
var standup = require('../library/standup');
var moment = require('moment');
var deployedTime = moment();

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

  controller.hears(['whendeploy'],['direct_message','direct_mention','mention'],function(bot,message) {
      bot.reply(message, 'I was deployed at ' + deployedTime.format());
  });

  controller.hears(['summarize (\\d+)d'],['direct_message','direct_mention','mention'],function(bot,message) {
      bot.reply(message, 'OK, I will summarize ...');
      var daysAgo = +(message.match[1]);
      bot.api.search.messages({ query: 'done in:standup', sort: 'timestamp', count: 100 }, function(err, resp) {
          if (err) {
              bot.reply(message, 'Ooops, something went wrong ' + err);
          } else {
              var summarized = standup.summarize(resp);
              bot.reply(message, 'Here\'s what the team has been doing for the past ' + daysAgo + ' day(s):\n\n' + summarized);
          }
      });
  });
};
