const { SlashCommandBuilder } = require('discord.js');

// Delete score from leaderboard
module.exports = {
	data: newSlashCommandBuilder()
		.setName('delscore')
		.setDescription('Remove a score from the leaderboard.')
		.addStringOption((option) => option.setName('weight').setDescription('The weight being added.').setRequired(true)),
	async execute(interaction) {
		// Placeholder
	},
};