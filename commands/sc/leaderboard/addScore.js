const {
  SlashCommandBuilder,
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

async function buttonHandler(interaction) {
  // Remove buttons
  await interaction.update({
    components: [],
  });

  const pending = getPending(interaction.user.id);
  confirmed = false;
  // Confirm Button
  if (interaction.customId === "confirm") {
    // If there is no pending (expired?)
    if (!pending) {
      return interaction.update({
        content:
          "No pending submission found, your submission may have expired. Please try running the command again.",
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
      content: `${interaction.user} submitted **${pending.weight}kg** for **${pending.exercise}**`,
    });
  } else {
    await interaction.followUp({
      content: "Submission cancelled, nothing was submitted.",
      flags: MessageFlags.Ephemeral,
    });
  }
}

// Add score to leaderboard (Delete any previous score from the leaderboard)
module.exports = {
  name: "addscore",
  data: new SlashCommandBuilder()
    .setName("addscore")
    .setDescription("Add a score to the leaderboard.")
    .addIntegerOption((option) =>
      option
        .setName("weight")
        .setDescription("The weight being submitted.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise being submitted.")
        .setRequired(true)
        .addChoices(...exerciseChoices),
    ),

  async execute(interaction) {
    // Store values from options
    const weight = interaction.options.getInt("weight");
    const exercise = interaction.options.getString("exercise");

    // Add entry to the pending object
    setPending(interaction.user.id, { weight, exercise });

    // Create button components
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

    // Request confirmation of submission
    const msg = await interaction.reply({
      content: `You want to submit ${weight}kg for ${exercise}.\nIs this correct?`,
      components: [row],
      flags: MessageFlags.Ephemeral,
      withResponse: true,
    });

    // Collector
    const collector = msg.resource?.message?.createMessageComponentCollector({
      filter: (i) => i.user.id == interaction.user.id,
      time: 30000,
      componentType: ComponentType.Button,
    });

    // Button selected
    collector?.on("collect", buttonHandler);

    // Button expiry
    collector?.on("end", (i) => {
      interaction.editReply({
        content: "Submission expired, Please try running the command again.",
        components: [],
      });
    });
  },
};
