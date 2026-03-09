const { SlashCommandBuilder } = require("discord.js");
const lbkgRatio = require("../../utils/lbkgRatio.js");

module.exports = {
  name: "convert",
  data: new SlashCommandBuilder()
    .setName("convert")
    .setDescription("Convert between pounds and kilograms")
    .addNumberOption((option) =>
      option
        .setName("weight")
        .setDescription("Weight being converted")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("convert_to")
        .setDescription("Convert to lb/kg")
        .setRequired(true)
        .addChoices(
          { name: "Kilograms (kg)", value: "kg" },
          { name: "Pounds (lb)", value: "lb" },
        ),
    ),

  async execute(interaction) {
		const weight = interaction.options.getNumber("weight");
		const lbkg = interaction.options.getString("convert_to");


		if (lbkg === "lb") {
			const newWeight = weight * lbkgRatio.ratio;
			return interaction.reply({
				content: `${weight}kg is equal to ${newWeight}lb`
			});
		}
		else {
			const newWeight = weight / lbkgRatio.ratio;
			return interaction.reply({
				content: `${weight}lb is equal to ${newWeight}kg`
			});
		}
	},
};
