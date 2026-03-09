const { SlashCommandSubcommandBuilder } = require("discord.js");
const genderDivisions = require("../../../utils/genderDivisions.js");
const dotsCoefficients = require("../../../utils/dotsCoefficients.js");

// Calculate user dots
module.exports = {
  name: "dots",
  data: new SlashCommandSubcommandBuilder()
    .setName("dots")
    .setDescription("Calculate DOTS score")
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The gender being submitted")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addNumberOption((option) =>
      option
        .setName("bodyweight")
        .setDescription("The user's bodyweight")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("bench")
        .setDescription("The weight being submitted for bench")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("squat")
        .setDescription("The weight being submitted for squat")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("deadlift")
        .setDescription("The weight being submitted for deadlift")
        .setRequired(true),
    ),

  async execute(interaction) {
    const gender = interaction.options.getString("gender");
    const bodyWeight = interaction.options.getNumber("bodyweight");
    const bench = interaction.options.getNumber("bench");
    const squat = interaction.options.getNumber("squat");
    const deadlift = interaction.options.getNumber("deadlift");

    const total = bench + squat + deadlift;

    // Dynamic lookup (dots[gender])
    const { a, b, c, d, e } = dotsCoefficients[gender];

    const denominator =
      a +
      b * bodyWeight +
      c * bodyWeight ** 2 +
      d * bodyWeight ** 3 +
      e * bodyWeight ** 4;

    dots = ((500 * total) / (denominator)).toFixed(2);

    await interaction.reply({
      content: `**DOTS = ${dots}**\nBW: ${bodyWeight}kg, TOTAL: ${total}kg (B: ${bench}kg, S: ${squat}kg, D: ${deadlift}kg)`,
    });
  },
};
