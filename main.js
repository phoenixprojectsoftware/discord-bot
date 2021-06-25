const Discord = require("discord.js");
const { token } = require("./cfg/auth.js");
const client = new Discord.Client();
const config = require("./cfg/config.js");
const { readdir } = require("fs/promises");

client.once('ready', () => {
	console.log('PhoenixBot is Online');
});


(async() => {						// based on SunburntRock89's ODbot code - https://github.com/OldDigibox/ODbot/blob/main/bot.js
	const constants = {
		config,
		client,
		startupTime: new Date(),
		commands: [],
	};
	
	let commands = await readdir("./cmd");
	for (let i of commands) {
		if (!i.endsWith(".js")) continue;
		const info = require(`./cmd/${i}`).info;
		if (!info.aliases) info.aliases = [];
		info.aliases.push(i.replace(".js", ""));
		info.filename = i;
		
		constants.commands.push(info);
	}
	
	let events = await readdir("./ev");
	for (let i of events) {
		if (!i.endsWith(".js")) continue;
		let eventName = i.replace(".js", "");
		client.on(eventName, async(...args) => require(`./ev/${i}`)(constants, ...args));
	}
})();


client.login(token);