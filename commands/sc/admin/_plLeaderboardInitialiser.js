const { SlashCommandSubcommandBuilder } = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const genderDivisions = require("../../../utils/genderDivisions.js");
const { getWeightDivision } = require("../../../utils/weightDivisions.js");
const { updateLeaderboardPL } = require("../../../utils/updateLeaderboard.js");

// Displays Leaderboard
module.exports = {
  name: "plleaderboard",
  data: new SlashCommandSubcommandBuilder()
    .setName("plleaderboard")
    .setDescription("Display leaderboard of submitted scores")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The relevant channel to place leaderboard.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const exercise = interaction.options.getString("exercise");
    const gender = interaction.options.getString("gender");
    const userWeight = interaction.options.getNumber("weightdivision");

    const weightDivision = getWeightDivision(userWeight, gender);

    const { redis } = interaction.client;

    const content = await updateLeaderboardPL(
      redis,
      exercise,
      gender,
      weightDivision,
    );

    await interaction.reply({
      content: content,
      allowedMentions: { users: [] },
    });
  },
};
