const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "protein",
  data: new SlashCommandBuilder()
    .setName("protein")
    .setDescription(
      "Calculate optimal protein intake for the inputted bodyweight",
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
