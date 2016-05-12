var _ = require('lodash'),
    moment = require('moment');

var customerService = require('../library/customer-service'),
    utility = require('../library/utility'),
    standup = require('../library/standup');
    
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

  controller.hears(['randomize (.*)'],['direct_message','direct_mention','mention'], function(bot,message) {
    bot.reply(message,utility.randomize(message.match[1]));
  });

  controller.hears(['roll (\\d+)','roll'],['direct_message','direct_mention','mention'], function(bot,message) {
    bot.reply(message,_.toString(utility.roll(+message.match[1])));
  });

  controller.hears(['whendeploy'],['direct_message','direct_mention','mention'],function(bot,message) {
      bot.reply(message, 'I was deployed at ' + deployedTime.format());
  });

  controller.hears(['summarize (\\d+)d'],['direct_message','direct_mention','mention'],function(bot,message) {
      var daysAgo = +(message.match[1]);
      var latest = moment();
      var oldest = moment().add(-daysAgo, 'd');
      var standupChannelId = 'C08C5FG4R';
      bot.api.users.list({}, function(err, usersData) {
          if (err) {
              bot.reply(message, 'I was looking up our team members, but this error occured: ' + err);
          } else {
              bot.api.channels.history({ channel: standupChannelId, latest: latest.unix(), oldest: oldest.unix(), count: 1000 }, function(err, messagesData) {
                  if (err) {
                      bot.reply(message, 'I was reading channel\'s history, but this error occured: ' + err);
                  } else {
                      var summarized = standup.summarize(messagesData, usersData);
                      bot.reply(message, 'Here\'s what the team has been doing for the past ' + daysAgo + ' day(s):\n\n' + summarized);
                  }
              });
          }
      });
  });
};
