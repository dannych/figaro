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
  nextReminder(bot,config,now);
}

function todayReminder(bot, config, now) {
  if (now.utc().hour() !== todayReminderTime.utc().hour() || now.utc().minute() !== todayReminderTime.utc().minute() || now.utc().second() !== todayReminderTime.utc().second()) return;
  if (customerService.isTodayWeekend()) return;
  
  bot.sendWebhook({
    text: 'Hi @' + customerService.getTodayCs() + ', this is just a friendly reminder. Today, you will be in charge as Customer Service',
    link_names: 1,
    channel: config.SLACK_CHANNEL,
  });
}

function nextReminder(bot, config, now) {
  if (now.utc().hour() !== nextReminderTime.utc().hour() || now.utc().minute() !== nextReminderTime.utc().minute() || now.utc().second() !== nextReminderTime.utc().second()) return;
  if (now.isoWeekday() === 6) return;
  if (now.isoWeekday() === 5) {
    return bot.sendWebhook({
      text: 'Hi @' + customerService.getNextCs() + '! Monday, you will be in charge as Customer Service',
      link_names: 1,
      channel: config.SLACK_CHANNEL,
    });
  }
  
  if (now.isoWeekday() === 7) {
    bot.sendWebhook({
      text: 'Hi @' + customerService.getTodayCs() + '! Tomorrow, you will be in charge as Customer Service',
      link_names: 1,
      channel: config.SLACK_CHANNEL,
    });
  }

  bot.sendWebhook({
    text: 'Hi @' + customerService.getNextCs() + '! Tomorrow, you will be in charge as Customer Service',
    link_names: 1,
    channel: config.SLACK_CHANNEL,
  });
}
