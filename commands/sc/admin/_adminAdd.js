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
          "No pending submission found, the command may have expired. Please try running the command again.",
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
      content: `${interaction.user} set ${pending.user}'s **${pending.exercise}** as **${pending.weight}kg**`,
    });
  } else {
    await interaction.followUp({
      content: "Command cancelled, nothing was submitted.",
      flags: MessageFlags.Ephemeral,
    });
  }
}

// Delete score from leaderboard
module.exports = {
  name: "add",
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("Add a PR to a user. (Admin Only)")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose PR is being added")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise PR that is being added")
        .setRequired(true)
				.addChoices(...exerciseChoices),
    )
		.addIntegerOption((option) =>
			option
				.setName("weight")
				.setDescription("The exercise weight that is being added")
				.setRequired(true)
		),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const exercise = interaction.options.getString("exercise");
		const weight = interaction.options.getInteger("weight");

    setPending(interaction.user.id, { user, exercise, weight});

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
      content: `You want to submit ${weight}kg as ${user}'s ${exercise} score.\nIs this correct?`,
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
