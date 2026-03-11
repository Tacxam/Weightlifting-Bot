const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
  PermissionFlagsBits,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const {
  setPending,
  getPending,
  deletePending,
} = require("../../../utils/pendingSubmission.js");
const memberRole = require("../../../utils/roles.js");
const genderDivisions = require("../../../utils/genderDivisions.js");
const { getWeightDivision } = require("../../../utils/weightDivisions.js");
const records = require("../../../utils/worldRecords.js");
const { dotsCalculator } = require("../../../utils/dotsHandler.js");

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

    const dots = dotsCalculator(
      pending.total,
      pending.gender,
      pending.weightDivision,
    );

    // Database handling
    const { redis } = interaction.client;

    // Submit score to relevant leaderboard
    const redisField = `powerlifting`;

    await redis.zAdd(redisField, [
      {
        value: interaction.user.id,
        score: dots,
      },
    ]);
    // Update user profile hash
    await redis.hSet(`user:${interaction.user.id}:lifts`, {
      // Computer property name syntax
      [redisField]: JSON.stringify({
        bench: pending.lifts.Bench,
        squat: pending.lifts.Squat,
        deadlift: pending.lifts.Deadlift,
        dateAdded: pending.createdAt,
      }),
    });

    deletePending(interaction.user.id);
  }

  // Cancel Button
  if (interaction.customId === "cancel") {
    deletePending(interaction.user.id);
  }

  // Handle text outputs
  if (confirmed) {
    await interaction.channel.send({
      content: `${interaction.user} submitted Bench:${pending.lifts.Bench}kg, Squat:${pending.lifts.Squat}kg, Deadlift:${pending.lifts.Deadlift}kg for the ${pending.gender} ${pending.weightDivision}kg division.`,
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
  name: "add",
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("Add powerlifting PRs.")
    .addNumberOption((option) =>
      option
        .setName("bench")
        .setDescription("The exercise being submitted.")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("squat")
        .setDescription("The exercise being submitted.")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("deadlift")
        .setDescription("The exercise being submitted.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The gender being submitted")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addNumberOption((option) =>
      option
        .setName("userweight")
        .setDescription("The user weight being submitted")
        .setRequired(true),
    ),

  async execute(interaction) {
    // Role checking
    if (!interaction.inGuild()) {
      return interaction.reply({
        content: "This command can only be used in a server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const hasMember = interaction.member.roles.cache.has(memberRole);
    const isAdmin = interaction.member.permissions.has(
      PermissionFlagsBits.Administrator,
    );

    if (!hasMember && !isAdmin) {
      return interaction.reply({
        content: "Missing member role",
        flags: MessageFlags.Ephemeral,
      });
    }

    const bench = interaction.options.getNumber("bench");
    const squat = interaction.options.getNumber("squat");
    const deadlift = interaction.options.getNumber("deadlift");

    const total = bench + squat + deadlift;

    const lifts = {
      Bench: bench,
      Squat: squat,
      Deadlift: deadlift,
    };

    // Lift validation handling
    for (const exercise in lifts) {
      const weight = lifts[exercise];
      const record = records[exercise];

      // Negative weight
      if (weight <= 0) {
        return interaction.reply({
          content: "Cannot submit a negative weight",
          flags: MessageFlags.Ephemeral,
        });
      }

      // Weight exceeds records
      if (record && weight >= record) {
        return interaction.reply({
          content: `Lift exceeds current raw world record for ${exercise} (${record}kg)`,
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    const gender = interaction.options.getString("gender");
    const userWeight = interaction.options.getNumber("userweight");

    const weightDivision = getWeightDivision(userWeight, gender);

    // Add entry to the pending object
    setPending(interaction.user.id, {
      total,
      lifts,
      gender,
      weightDivision,
    });

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
      content: `You want to submit Bench:${bench}kg, Squat:${squat}kg, Deadlift:${deadlift}kg in the ${gender} ${weightDivision}kg division.\nIs this correct?`,
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
