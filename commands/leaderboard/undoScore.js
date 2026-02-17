const { SlashCommandBuilder } = require('discord.js');

// Delete score from leaderboard
module.exports = {
	data: newSlashCommandBuilder()
		.setName('undoscore')
		.setDescription('Undo a score from the leaderboard. An older score will replace it')
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise score that is being undone').setRequired(true)),
	async execute(interaction) {
		// Placeholder
	},
};