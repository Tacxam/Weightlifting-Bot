const { SlashCommandSubcommandBuilder } = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const genderDivisions = require("../../../utils/genderDivisions.js");
const { getWeightDivision } = require("../../../utils/weightDivisions.js");
const { updateLeaderboardPL } = require("../../../utils/updateLeaderboard.js");

// Displays Leaderboard
module.exports = {
  name: "leaderboard",
  data: new SlashCommandSubcommandBuilder()
    .setName("leaderboard")
    .setDescription("Display leaderboard of submitted scores")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The relevant exercise leaderboard")
        .setRequired(true)
        .setChoices(...exerciseChoices),
    )
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The division gender")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addNumberOption((option) =>
      option
        .setName("weightclass")
        .setDescription("The division weight class")
        .setRequired(true),
    ),

  async execute(interaction) {
    const exercise = interaction.options.getString("exercise");
    const gender = interaction.options.getString("gender");
    const weightclass = interaction.options.getNumber("weightclass");

    const weightDivision = getWeightDivision(userWeight, gender);

    let content = `**${exercise}:${gender}:${weightDivision}kg Leaderboard (Top 10):**\n`;


  },
};
