const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption((option) => option.setName('command').setDescription('The command to reload.').setRequired(true)),
	async execute(interaction) {
		// Get value from 'command' eg: /reload command: ping - commandName === ping
		const commandName = interaction.options.getString('command', true).toLowerCase();
		// Looks up 'commandName' and if exists, assigns the module to command. eg. if commandName === ping - ping module is assigned to 'command'
		const command = interaction.client.commands.get(commandName);
		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}
		// Delete from command cache
		delete require.cache[require.resolve(`./${command.data.name}.js`)];
		try {
			const newCommand = require(`./${command.data.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply(
				`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
			);
		}
	},

};