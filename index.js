var Botkit = require('botkit'),
    moment = require('moment');

var people = ['darwin.gautalius', 'stevenihan', 'ahayamb', 'rizaanjariputri', 'timothykevin', 'yclarista', 'eckyputrady', 'ariza.ramaditia', 'aditya', 'jonathancesario', 'dannych', 'sindunuragarp'],
    start = moment('2016-05-10 +0700', 'YYYY-MM-DD ZZ'),
    reminder = moment('08:00:00 +0700','HH:mm:ss ZZ'),  
    channel = 'standup';

var controller = Botkit.slackbot({});

var bot = controller.spawn({
    token: 'xoxb-41188147622-lKNetv4sTev7Bw9ziA6U9jiC'
}).startRTM();

controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);
});
bot.configureIncomingWebhook({url: 'https://hooks.slack.com/services/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'});

// bot.sendWebhook({
//     text: 'Deployed successfully!',
//     channel: channel,
// });  

var slackWebHooke = setInterval(sendWebhook, 1000);    

controller.on('slash_command',function(bot,message) {
  if (message.command === '/whoiscs') {
    bot.replyPublic(message,getTodayCs());      
  }
});

function getTodayCs() {
  var now = moment(),
      diff = now.diff(start,'days'),
      personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function sendWebhook() {
  var now = moment();    
  if (now.utc().hour() !== reminder.utc().hour() || now.utc().minute() !== reminder.utc().minute() || now.utc().second() != reminder.utc().second()) return;
          
  bot.sendWebhook({
    text: 'Hi @' + getTodayCs() + ', this is just a friendly reminder. Today, you will be in charge as Costumer Service',
    link_names: 1,
    channel: channel,
  });  
}
