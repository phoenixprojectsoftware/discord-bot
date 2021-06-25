#!/bin/sh

cd /usr/src/bot
envsubst < /usr/src/bot/cfg/auth-template.js > /usr/src/bot/cfg/auth.js
node main.js