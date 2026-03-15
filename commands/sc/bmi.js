const { SlashCommandBuilder } = require("discord.js");
const { getBMI } = require("../../utils/bmi.js");

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
		const height = interaction.options.getNumber("height");
    const bodyweight = interaction.options.getNumber("bodyweight");

		const content = getBMI(height, bodyweight);

    return interaction.reply({
      content,
    });
  },
};