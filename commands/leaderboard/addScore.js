const { SlashCommandBuilder } = require('discord.js');
const exerciseChoices = require('../../utils/exerciseChoices.js');

// Add score to leaderboard (Delete any previous score from the leaderboard)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('addscore')
		.setDescription('Add a score to the leaderboard.')
		.addStringOption((option) => option.setName('weight').setDescription('The weight being submitted.').setRequired(true))
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise being submitted.').setRequired(true).addChoices(...exerciseChoices)),
	async execute(interaction) {
		const weight = interaction.options.getString('weight');
		const exercise = interaction.options.getString('exercise');

		await interaction.reply({
			content: `You have submitted ${weight}kg for ${exercise}.`,
		});
	},
};