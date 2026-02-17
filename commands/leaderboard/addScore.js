const { SlashCommandBuilder } = require('discord.js');

// Add score to leaderboard
module.exports = {
	data: newSlashCommandBuilder()
		.setName('addscore')
		.setDescription('Add a score to the leaderboard.')
		.addStringOption((option) => option.setName('weight').setDescription('The weight being submitted.').setRequired(true))
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise being submitted.').setRequired(true)),
	async execute(interaction) {
		// Placeholder
	},
};