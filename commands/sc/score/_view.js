const { SlashCommandSubcommandBuilder } = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "viewleaderboard",
  data: new SlashCommandSubcommandBuilder()
    .setName("view")
    .setDescription("Display leaderboard of submitted scores")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The relevant exercise leaderboard")
        .setRequired(true)
        .setChoices(...exerciseChoices),
    ),

  async execute(interaction) {
    const exercise = interaction.options.addStringOption("exercise");
		// ...functionality
	},
};
