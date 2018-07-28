# Slack Slash Commander

call slack slash commands from cli.


## Installation
```
$ npm install -g slack-cmd
```

## Options
#### -w
Slack workspace name.  
You can get slack app side menu or web URL (https://WORKSPACE_NAME.slack.com/).

#### -c
Slack Slash Command.  
`/topic this is develop topic` => topic

#### -t
Slack Slash Command text.  
`/topic this is develop topic` => "this is develop topic"

#### -C
Slack Channel ID.  
How to get Channel ID ?  
1. Go to your web URL (https://WORKSPACE_NAME.slack.com/).
2. Click the channel.
3. Find the Channel ID after /messages/ (https://WORKSPACE_NAME.slack.com/messages/CHANNEL_ID)

#### -T
Slack API Token.  
You can get https://api.slack.com/custom-integrations/legacy-tokens

## Example

slash command set topic: `/topic this is develop topic`

```
$ slack-cmd -w xxx -c topic -t "this is develop topic" -C xxxxx -T xxxx-xxxxxxxxx-xxxx
```
