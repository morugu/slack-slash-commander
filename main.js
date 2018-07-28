#!/usr/bin/env node

'use strict';

const request = require('request');
const program = require('commander');

program
.version('0.0.1', '-v, --version')
.usage('-c SLASH_COMMAND -t "SLASH_COMMAND_TEXT" -w WORKSPACE_NAME -C CHANNEL_ID -T SLACK_API_TOKEN')
.option('-w, --workspace <slack workspace name>', 'slack workspace name')
.option('-c, --command <slash command name>', 'slash command without /')
.option('-t, --text "<slash command text>"', 'slash command text')
.option('-C, --channel <channel id>', 'slack channel id')
.option('-T, --token <slack api token>', 'slack api token')
.parse(process.argv);

const main = (program) => {
    const url = `https://${program.workspace}.slack.com/api/chat.command`;
    const body = {
    	command: `/${program.command}`,
    	text: program.text,
    	channel: program.channel,
    	disp: `/${program.command}`,
    	token: program.token
    };
    const boundary = ``;

    var data = '';
    for (var i in body) {
    	if ({}.hasOwnProperty.call(body, i)) {
    		data += `--${boundary}\r\n`;
    		data += `Content-Disposition: form-data; name="${i}"; \r\n\r\n${body[i]}\r\n`;
    	}
    }

    data += `--${boundary}\r\n`;
    var payload = Buffer.concat([
    	Buffer.from(data, 'utf8'),
    	Buffer.from(`\r\n--${boundary}\r\n`, 'utf8')
    ]);

    var options = {
    	method: 'post',
    	url: url,
    	headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`},
    	body: payload
    };

    request(options, function(error, response, body) {
        if (error) {
        	console.log(error);
        }
    	console.log(body);
    });
}

let err = '';
if (!program.workspace) {
    err = 'Error: -w option is required argument.';
}
if (!program.command) {
    err = 'Error: -c option is required argument.';
}
if (!program.text) {
    err = 'Error: -t option is required argument.';
}
if (!program.channel) {
    err = 'Error: -C option is required argument.';
}
if (!program.token) {
    err = 'Error: -T option is required argument.';
}
if (err) {
    console.log(err);
    return;
}

main(program);
