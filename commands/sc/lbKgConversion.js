const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "lb/kg converter",
  data: new SlashCommandBuilder()
    .setName("lb/kg converter")
    .setDescription("Convert from lb to kg or vice versa")
    .addStringOption((option) =>
      option
        .setName("Convert to")
        .setDescription("Convert to lb/kg")
        .setRequired(true)
        .addChoices(),
    )
    .addNumberOption((option) =>
      option
        .setName("weight")
        .setDescription("Weight being converted")
        .setRequired(true),
    ),

		async execute(interaction) {
			
		}
};
