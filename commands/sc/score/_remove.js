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
  name: "removescore",
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("Remove a score.")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise score that is being removed")
        .setRequired(true)
        .addChoices(...exerciseChoices),
    ),
  async execute(interaction) {
    const exercise = interaction.options.getString("exercise");

    setPending(interaction.user.id, { exercise });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("confirm")
        .setLabel("Confirm")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Danger),
    );

    const msg = await interaction.reply({
      content: `You want to remove your score for ${exercise}. Is this correct?`,
      components: [row],
      flags: MessageFlags.Ephemeral,
      // Gives access to the interaction.reply object
      withResponse: true,
    });

    /*
    Collector Handling the Buttons
    */

    // Collector
    const collector = msg.resource?.message?.createMessageComponentCollector({
      filter: (i) => i.user.id == interaction.user.id,
      time: 30000,
      componentType: ComponentType.Button,
    });

    // Button selected
    collector?.on("collect", async (i) => {
      await buttonHandler(i);
      collector.stop("handled");
    });

    // Button expiry
    collector?.on("end", async (collected, reason) => {
      if (reason === "time" && collected.size === 0) {
        await interaction.editReply({
          content: "Submission expired, Please try running the command again.",
          components: [],
        });
      }
    });
  },
};
