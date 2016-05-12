# Pinocchio [![Circle CI](https://circleci.com/gh/dannych/pinocchio.svg?style=svg&circle-token=09bd53cc4079f5b420b8bbbbfd8fb847de2095c3)](https://circleci.com/gh/dannych/pinocchio)

It is a bot

## Get Started

First, you need a slack team
- you can do it on your existing team but beware of the limitations
- create dummy slack team 
- ask somebody for an invitation to join to our bot channel

Secondly, you need the token for the Bot and/or webhooks

- Slack Bot Guide: https://api.slack.com/bot-users
- Create Bot in Slack: https://my.slack.com/services/new/bot

We also use the webhook
- Slack Webhook Guide: https://api.slack.com/incoming-webhooks
- Create Webhook: https://my.slack.com/services/new/incoming-webhook/

Finally, just run `node index` or `npm start`. Enjoy~

```
Psstt.. Bot is like a vampire - they need to be invited first.
```

## Tools

### BotKit

A javascript library for creating bot

### Heroku

Our deploy environment. It's free with a help from Caffeine web app.

Any change in `master` will trigger build in Heroku
