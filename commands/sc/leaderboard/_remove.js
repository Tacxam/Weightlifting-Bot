const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const {
  setPending,
  getPending,
  deletePending,
} = require("../../../utils/pendingSubmission.js");

// Button handling
async function buttonHandler(interaction) {
  // Remove buttons
  await interaction.update({
    components: [],
  });

  const pending = getPending(interaction.user.id);
  let confirmed = false;
  // Confirm Button
  if (interaction.customId === "confirm") {
    // If there is no pending (expired?)
    if (!pending) {
      return interaction.update({
        content:
          "No pending removal found, the command may have expired. Please try running the command again.",
        components: [],
      });
    }

    confirmed = true;

    // ... functionality

    deletePending(interaction.user.id);
  }

  // Cancel Button
  if (interaction.customId === "cancel") {
    deletePending(interaction.user.id);
  }

  // Handle text outputs
  if (confirmed) {
    await interaction.channel.send({
      content: `${interaction.user} removed **${pending.weight}kg** for **${pending.exercise}**`,
    });
  } else {
    await interaction.followUp({
      content: "Command cancelled, nothing was removed.",
      flags: MessageFlags.Ephemeral,
    });
  }
}

// Delete score from leaderboard
module.exports = {
  name: "removescore",
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("Remove a score from the leaderboard.")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise score that is being deleted")
        .setRequired(true),
    ),
  async execute(interaction) {
    const exercise = interaction.option.getString("exercise");


    // ...Database interaction
  },
};
