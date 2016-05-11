var Botkit = require('botkit'),
    moment = require('moment');
    
var botReplies  = require('./replies'),
    botWebhooks = require('./webhooks');
    
var config = {
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || '',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || ''
};

var controller = Botkit.slackbot({}),
    bot = controller.spawn({
    token: config.SLACK_BOT_TOKEN
}).startRTM();

botReplies(bot,controller,config);
botWebhooks(bot,controller,config);

// Send Success Message

bot.sendWebhook({
    text: 'Testing auto deploy!',
    channel: 'standup',
});  