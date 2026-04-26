const { SlashCommandBuilder } = require("discord.js");
const { getFFMI } = require("../../utils/ffmi.js");

module.exports = {
  name: "ffmi",
  data: new SlashCommandBuilder()
    .setName("ffmi")
    .setDescription(
      "Calculate FFMI",
    )
		.addNumberOption((option) =>
      option
        .setName("height")
        .setDescription("Height in cm.")
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName("bodyweight")
        .setDescription("Bodyweight in kg.")
        .setRequired(true),
    )
		.addNumberOption((option) =>
      option
        .setName("bodyfatpercent")
        .setDescription("Body fat percentage, if bodyfat is 17%, type 17.")
        .setRequired(true),
    ),

  async execute(interaction) {
		const height = interaction.options.getNumber("height");
    const bodyweight = interaction.options.getNumber("bodyweight");
		const bodyFat = interaction.options.getNumber("bodyfat");

		const content = getFFMI(height, bodyweight, bodyFat);

    return interaction.reply({
      content,
    });
  },
};