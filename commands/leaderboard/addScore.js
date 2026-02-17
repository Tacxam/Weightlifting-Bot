const { SlashCommandBuilder } = require('discord.js');

// Add score to leaderboard (Delete any previous score from the leaderboard)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('addscore')
		.setDescription('Add a score to the leaderboard.')
		.addStringOption((option) => option.setName('weight').setDescription('The weight being submitted.').setRequired(true))
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise being submitted.').setRequired(true)),
	async execute(interaction) {
		// Placeholder
	},
};