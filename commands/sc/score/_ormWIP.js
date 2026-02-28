const { SlashCommandSubcommandBuilder } = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "orm",
  data: new SlashCommandSubcommandBuilder()
    .setName("orm")
    .setDescription("Estimate one-rep max")
    .addIntegerOption((option) =>
      option
        .setName("weight")
        .setDescription("The relevant weight")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("reps")
        .setDescription("The relevant repetitions")
        .setRequired(true),
    ),

  async execute(interaction) {
    const weight = interaction.options.addIntegerOption("weight");
		const reps = interaction.options.addIntegerOption("reps");
		// ...functionality
	},
};
