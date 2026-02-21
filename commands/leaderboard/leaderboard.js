const { SlashCommandBuilder } = require("discord.js");
const exerciseChoices = require("../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "leaderboard",
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Display leaderboard of submitted scores")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The relevant exercise leaderboard")
        .setRequired(true)
        .setChoices(...exerciseChoices),
    ),

  async execute(interaction) {
		// ...functionality
	},
};
