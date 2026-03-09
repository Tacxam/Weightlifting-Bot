const { SlashCommandSubcommandBuilder } = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "orm",
  data: new SlashCommandSubcommandBuilder()
    .setName("orm")
    .setDescription(
      "Estimate one-rep max with the Epley Formula (Inaccurate above 10 reps)",
    )
    .addNumberOption((option) =>
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
    const weight = interaction.options.getNumber("weight");
    const reps = interaction.options.getInteger("reps");

    const orm = Math.round(weight * (1 + reps / 30));

    await interaction.reply({
      content: `The one-rep max for ${reps} reps at ${weight}kg is extimated to be **${orm}kg**.`,
    });
  },
};
