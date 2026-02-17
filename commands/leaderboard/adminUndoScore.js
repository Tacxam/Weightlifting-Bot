const { SlashCommandBuilder } = require('discord.js');

// Delete score from leaderboard (Retrieve older score from leaderboard to replace removed score if exists)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('adminundoscore')
		.setDescription('Undo a score from the leaderboard. An older score will replace it (Admin Only)')
		.addStringOption((option) => option.setName('user').setDescription('The user whose score is being undone').setRequired(true))
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise score that is being undone').setRequired(true)),
	async execute(interaction) {
		// Placeholder
	},
};