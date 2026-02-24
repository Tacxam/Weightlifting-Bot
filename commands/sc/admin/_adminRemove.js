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

    /*
     ... functionality
     Check for score
     if score exists
     delete score, reply saying score deleted
     else, reply saying no score found
    */

    deletePending(interaction.user.id);
  }

  // Cancel Button
  if (interaction.customId === "cancel") {
    deletePending(interaction.user.id);
  }

  // Handle text outputs
  if (confirmed) {
    await interaction.channel.send({
      content: `${interaction.user} removed their score for **${pending.exercise}**`,
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
  name: "remove",
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("Remove a score from the leaderboard. (Admin Only)")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose score is being deleted")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise score that is being deleted")
        .setRequired(true),
    ),
  async execute(interaction) {
    const user = interaction.options.addStringOption("user");
    const exercise = interaction.options.addStringOption("exercise");


  },
};
