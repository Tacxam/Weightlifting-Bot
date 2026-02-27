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
const memberRole = require("../../../utils/roles.js")

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

    // Database handling
    const { redis } = interaction.client;
    await redis.zAdd(`${pending.exercise}`, [{value: interaction.user.id, score: pending.weight}]);

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
      content: "Command cancelled, nothing was submitted.",
      flags: MessageFlags.Ephemeral,
    });
  }
}

// Add score to leaderboard (Delete any previous score)
module.exports = {
  name: "addscore",
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("Add a PR. If PR already exists, overwrites old PR.")
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

    // Store values from options
    const weight = interaction.options.getInteger("weight");
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
