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
const genderDivisions = require("../../../utils/genderDivisions.js");
const { maleWeightDivisions, femaleWeightDivisions } = require("../../../utils/weightDivisions.js")

// Button handling (Default code currently)
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

module.exports = {
  name: "division",
  data: new SlashCommandSubcommandBuilder()
    .setName("division")
    .setDescription("Sets user competition division.")
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The gender being submitted")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addIntegerOption((option) =>
      option
        .setName("weight")
        .setDescription("The user weight being submitted")
        .setRequired(true)
    ),

  /*
    Handle determining weight class for inputted weight
    Keys: Weight class, gender, users
    Values: User.id, User.id, Weight class-gender-user.id
    The above are what will be stored in the DB for organising data
  */
	async execute(interaction) {
    const gender = interaction.options.getStringOption("gender");
    const weight = interaction.options.getIntegerOption("weight");

    const weightDivisions = gender === "Male" ? maleWeightDivisions : femaleWeightDivisions;

    // Check if user is already registered

	}
};
