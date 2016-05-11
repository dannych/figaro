# Configuration File

Created so that these files won't be tracked (as frequently) as other files

## Secret.json

This file will contain your sensitive data such as Bot Token and/or WebHook URL. 
Create it yourself - so it won't be tracked by Git! 
Just in case, the format is JSON (double quoted and no-excessive comma.

```
{
  "SLACK_BOT_TOKEN": "xx-xx-xx-xx",
  "SLACK_WEBHOOK_URL": "https://xx-xx.com/xxxx-xxxx"
}
```

## Custom.json

This file doesn't contain sensitve data but works as a default value.

```
{
  "CHANNEL": "general",
  "PORT": "3000"
}
```