var Botkit = require('botkit'),
    moment = require('moment');

var people = ['darwin.gautalius', 'stevenihan', 'ahayamb', 'rizaanjariputri', 'timothykevin', 'yclarista', 'eckyputrady', 'ariza.ramaditia', 'aditya', 'jonathancesario', 'dannych', 'sindunuragarp'],
    start = moment('2016-05-10 +0700', 'YYYY-MM-DD ZZ'),
    reminder = moment('08:00:00 +0700','HH:mm:ss ZZ');

var controller = Botkit.slackbot({});

var bot = controller.spawn({
    token: 'xoxb-41188147622-lKNetv4sTev7Bw9ziA6U9jiC'
}).startRTM();


bot.configureIncomingWebhook({url: 'https://hooks.slack.com/services/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'});

bot.sendWebhook({
    text: 'Deployed successfully!',
    channel: '#test',
});  

var interval = setInterval(sendWebhook, 1000);

controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);
});


function sendWebhook() {
  var now = moment(),
      diff = now.diff(start,'days'),
      personInCharge = people[diff % people.length];  
      
  if (now.utc().hour() !== reminder.utc().hour() || now.utc().minute() !== reminder.utc().minute() || now.utc().second() != reminder.utc().second()) return;
          
  bot.sendWebhook({
    text: 'Hi @' + personInCharge + ', this is just a friendly reminder. Today, you will be in charge as Costumer Service',
    link_names: 1,
    channel: '#test',
  });  
}

