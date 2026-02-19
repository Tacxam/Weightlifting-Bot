const { SlashCommandBuilder } = require('discord.js');
const exerciseChoices = require('../../utils/exerciseChoices.js');
const { setPending } = require('../../utils/pendingSubmission.js');

// Add score to leaderboard (Delete any previous score from the leaderboard)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('addscore')
		.setDescription('Add a score to the leaderboard.')
		.addStringOption((option) => option.setName('weight').setDescription('The weight being submitted.').setRequired(true))
		.addStringOption((option) => option.setName('exercise').setDescription('The exercise being submitted.').setRequired(true).addChoices(...exerciseChoices)),
	async execute(interaction) {
		// Store values from options
		const weight = interaction.options.getString('weight');
		const exercise = interaction.options.getString('exercise');

		// Add entry to the pending object
		setPending(interaction.user.id, { weight, exercise });

		// Create button components
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('confirm').setLabel('Confirm').setStyle(ButtonStyle.Success),
			new ButtonBuilder()
				.setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger),
		);

		// Request confirmation of submission
		await interaction.reply({
			content: `You have submitted ${weight}kg for ${exercise}.\nIs this correct?`,
			component: [row],
			ephemeral: true,
		});
	},
};