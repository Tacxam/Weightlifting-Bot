const { getPending, deletePending } = require('../../utils/pendingSubmission.js');
const { MessageFlags } = require('discord.js');

module.exports = async function buttonHandler(interaction) {
	// Remove buttons
	await interaction.update({
		components: [],
	});

	const pending = getPending(interaction.user.id);
	confirmed = false;
	// Confirm Button
	if (interaction.customId === 'confirm') {
		// If there is no pending (expired?)
		if (!pending) {
			return interaction.update({
				content: 'No pending submission found, your submission may have expired. Please try running the command again.',
				components: [],
			});
		}

		confirmed = true;

		// ... functionality

		deletePending(interaction.user.id);
	}

	// Cancel Button
	if (interaction.customId === 'cancel') {
		deletePending(interaction.user.id);
	}

	// Handle text outputs
	if (confirmed) {
		await interaction.channel.send({
			content: `${interaction.user} submitted **${pending.weight}kg** for **${pending.exercise}**`,
		});
	}
	else {
		await interaction.followUp({
			content: 'Submission cancelled, nothing was submitted.',
			flags: MessageFlags.Ephemeral,
		});
	}
};