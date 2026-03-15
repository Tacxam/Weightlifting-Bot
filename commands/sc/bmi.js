const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "bmi",
  data: new SlashCommandBuilder()
    .setName("bmi")
    .setDescription(
      "Calculate BMI",
    )
		.addNumberOption((option) =>
      option
        .setName("height")
        .setDescription("Height, not much else to say")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("bodyweight")
        .setDescription("Bodyweight, not much else to say")
        .setRequired(true),
    ),

  async execute(interaction) {
    const bodyweight = interaction.options.getNumber("bodyweight");

    const lowerBound = (1.6 * bodyweight).toFixed(0);
		const upperBound = (2.2 * bodyweight).toFixed(0);

    return interaction.reply({
      content: `Ideal protein intake for a bodyweight of **${bodyweight}kg** is between **${lowerBound}g** to **${upperBound}g** (1.6 - 2.2 g/kg) per day during a bulk.\nHigher protein intake may be recommended on a cut.`,
    });
  },
};