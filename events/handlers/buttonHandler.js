const { getPending, deletePending } = require('pendingSubmission.js');

module.exports = async function buttonHandler(interaction) {
	// Confirm Button
	if (interaction.customId === 'confirm') {
		const pending = getPending(interaction.user.id);

		// If there is no pending (expired?)
		if (!pending) {
			await interaction.reply('No pending submission found, your submission may have expired. Please try running the command again.');
		}

		// ... functionality

		deletePending(interaction.user.id);
		await interaction.update(`**${interaction.user.id}** submitted **${pending.weight}** for **${pending.exercise}**`);
	}

	// Cancel Button
	if (interaction.customID === 'cancel') {
		deletePending(interaction.user.id);

		await interaction.reply(' Submission cancelled, nothing was submitted. ');
	}
};