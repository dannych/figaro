var Botkit = require('botkit'),
    moment = require('moment');
    
var botReplies  = require('./replies'),
    botWebhooks = require('./webhooks');

var controller = Botkit.slackbot({}),
    bot = controller.spawn({
    token: 'xoxb-41188147622-lKNetv4sTev7Bw9ziA6U9jiC'
}).startRTM();

botReplies(bot,controller);
botWebhooks(bot,controller);

// Send Success Message
//
// bot.sendWebhook({
//     text: 'Deployed successfully!',
//     channel: channel,
// });  