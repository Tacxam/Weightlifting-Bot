const { getPending, deletePending } = require('../../utils/pendingSubmission.js');

module.exports = async function buttonHandler(interaction) {
	// Confirm Button
	if (interaction.customId === 'confirm') {
		const pending = getPending(interaction.user.id);

		// If there is no pending (expired?)
		if (!pending) {
			await interaction.reply({
				content: 'No pending submission found, your submission may have expired. Please try running the command again.',
			});
		}

		// ... functionality

		// Remove buttons
		deletePending(interaction.user.id);
		await interaction.update({
			components: [],
		});
		// Publicly Announce change
		await interaction.channel.send({
			content: `${interaction.user} submitted **${pending.weight}kg** for **${pending.exercise}**`,
		});
	}

	// Cancel Button
	if (interaction.customID === 'cancel') {
		deletePending(interaction.user.id);

		await interaction.reply({
			content: 'Submission cancelled, nothing was submitted.',
		});
	}
};