const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
  PermissionFlagsBits
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
  let removals = 0;
  let score;

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

    // Database handling
    const { redis } = interaction.client;
    score = await redis.zScore(`${pending.exercise}`, interaction.user.id);
    removals = await redis.zRem(`${pending.exercise}`, interaction.user.id);

    deletePending(interaction.user.id);
  }

  // Cancel Button
  if (interaction.customId === "cancel") {
    deletePending(interaction.user.id);
  }

  // Handle text outputs
  if (confirmed && removals === 1) {
    await interaction.channel.send({
      content: `${interaction.user} removed their PR for **${pending.exercise}** (**${score}kg**)`,
    });
  }
  else if (confirmed && removals === 0) {
    await interaction.followUp({
      content: "No PR found, nothing was removed.",
      flags: MessageFlags.Ephemeral,
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
        .setDescription("The exercise PR that is being removed.")
        .setRequired(true)
        .addChoices(...exerciseChoices),
    ),
  async execute(interaction) {
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "This command can only be used in a server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const hasMember = interaction.member.roles.cache.has(memberRole);
    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

    if (!hasMember && !isAdmin) {
      return interaction.reply({
        content: "Missing member role",
        flags: MessageFlags.Ephemeral,
      })
    }

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
      content: `You want to remove your PR for ${exercise}. Is this correct?`,
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
