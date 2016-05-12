var Botkit = require('botkit'),
    moment = require('moment');
    
var config = require('./config')

var controller = Botkit.slackbot({}),
    bot = controller.spawn({
      token: config.SLACK_BOT_TOKEN
    }).startRTM();

var replies  = require('./replies')(bot,controller,config),
    webhooks = require('./webhooks')(bot,controller,config);
    
    var a = 0; 

// Send Success Message

// bot.sendWebhook({
//     text: 'Testing auto deploy!',
//     channel: 'standup',
// });  