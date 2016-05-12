var moment = require('moment'),
  _ = require('lodash'),
  customerService = require('../library/customer-service');

var todayReminderTime = moment('08:00:00 +0700','HH:mm:ss ZZ'),
  nextReminderTime = moment('17:00:00 +0700','HH:mm:ss ZZ');

module.exports = function(bot, controller, config) {
  setInterval(_.partial(sendWebhook,bot,config), 1000);
};

function sendWebhook(bot,config) {
  var now = moment();
  todayReminder(bot,config,now);
  tomorrowReminder(bot,config,now);
}

function todayReminder(bot, config, now) {
  if (now.utc().hour() !== todayReminderTime.utc().hour() || now.utc().minute() !== todayReminderTime.utc().minute() || now.utc().second() !== todayReminderTime.utc().second()) return;

  bot.sendWebhook({
    text: 'Hi @' + customerService.getTodayCs() + ', this is just a friendly reminder. Today, you will be in charge as Customer Service',
    link_names: 1,
    channel: config.SLACK_CHANNEL,
  });
}

function tomorrowReminder(bot, config, now) {
  if (now.utc().hour() !== nextReminderTime.utc().hour() || now.utc().minute() !== nextReminderTime.utc().minute() || now.utc().second() !== nextReminderTime.utc().second()) return;

  bot.sendWebhook({
    text: 'Hi @' + customerService.getNextCs() + '! Tomorrow, you will be in charge as Customer Service',
    link_names: 1,
    channel: config.SLACK_CHANNEL,
  });
}
