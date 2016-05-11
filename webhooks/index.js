var moment = require('moment'),
  _ = require('lodash'),  
  customerService = require('../library/customer-service');

var todayReminderTime = moment('08:00:00 +0700','HH:mm:ss ZZ'),
  nextReminderTime = moment('17:00:00 +0700','HH:mm:ss ZZ'),  
  channel = 'standup'
    
module.exports = function(bot, controller) {
  setInterval(_.partial(sendWebhook,bot), 1000);    
};

function sendWebhook(bot) {
  var now = moment();    
  todayReminder(bot,now);
  tomorrowReminder(bot,now);
}

function todayReminder(bot, now) {
  if (now.utc().hour() !== todayReminderTime.utc().hour() || now.utc().minute() !== todayReminderTime.utc().minute() || now.utc().second() != todayReminderTime.utc().second()) return;
          
  bot.sendWebhook({
    text: 'Hi @' + customerService.getTodayCs() + ', this is just a friendly reminder. Today, you will be in charge as Costumer Service',
    link_names: 1,
    channel: channel,
  });  
}

function tomorrowReminder(bot, now) {
  if (now.utc().hour() !== nextReminderTime.utc().hour() || now.utc().minute() !== nextReminderTime.utc().minute() || now.utc().second() != tomorrowReminderTime.utc().second()) return;
          
  bot.sendWebhook({
    text: 'Hi @' + customerService.getNextCs() + '! Tomorrow, you will be in charge as Costumer Service',
    link_names: 1,
    channel: channel,
  }); 
}
