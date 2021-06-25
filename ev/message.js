// by SunburntRock89 from Old Digibox
// https://github.com/OldDigibox/ODbot/blob/main/Events/message.js

module.exports = async (constants, msg) => {
	const client = constants.client, config = constants.config;

	const prefix = msg.content.startsWith(client.user.toString()) ? `${client.user} ` : config.defaultPrefix;

	const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "");
	const suffix = msg.content.split(" ").splice(1).join(" ")
		.trim();

	if ((!suffix || suffix.length < 0) && msg.mentions?.members?.first()?.id == client.user.id) return;

	if (msg.author.bot || !msg.content.startsWith(prefix)) return;
	let cmdFile;
	try {
		let foundCommand = constants.commands.find(c => c.aliases.includes(cmd));
		if (foundCommand) {
			cmdFile = require(`../cmd/${foundCommand.filename}`);
		} else { cmdFile = require(`../cmd/${cmd}.js`); }
	} catch (_) {
		//
	}

	if (cmdFile) {
		try {
			await cmdFile(constants, msg, suffix);
		} catch (err) {
			msg.channel.send({
				embed: {
					color: config.colors.error,
					title: ":x: Error!",
					description: `An unexpected error has occurred.\n\`\`\`js\n${err.stack}\`\`\``,
					footer: {
						text: "Please contact a maintainer.",
					},
				},
			});
		}
	}
};