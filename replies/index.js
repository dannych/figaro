var _ = require('lodash'),
    bluebird = require('bluebird'),
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
      var channelHistoryF = bluebird.promisify(bot.api.channels.history);
      var usersListF = bluebird.promisify(bot.api.users.list);

      function getChannelHistoryExhaustively(prevData, latest, oldest) {
          bot.reply(message, "I'm reading channel history ... latest=" + latest + " oldest=" + oldest)
          return channelHistoryF({channel: standupChannelId, latest: latest, oldest: oldest, count: 1000})
              .then(function(ret) {
                  var combinedData = prevData.concat(ret.messages);
                  if (ret.messages.length > 0 && ret.has_more) {
                      var curOldest = ret.messages[ret.messages.length - 1].ts;
                      return getChannelHistoryExhaustively(combinedData, curOldest, oldest);
                  } else {
                      return combinedData;
                  }
              });
      }

      var usersListP = usersListF().then(function(x) { return x.members; });
      var channelHistoryP = getChannelHistoryExhaustively([], latest.unix(), oldest.unix());

      bluebird.join(channelHistoryP, usersListP, function(messagesData, usersData) {
          var summarized = standup.summarize(messagesData, usersData);
          bot.reply(message, 'Here\'s what the team has been doing for the past ' + daysAgo + ' day(s):\n\n' + summarized);
      }).catch(function(e) {
          bot.reply(message, 'I was summarizing when I encounter this error: ' + e);
      });
  });
};
