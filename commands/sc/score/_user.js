const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
} = require("discord.js");

module.exports = {
	name: "user",
	data: new SlashCommandSubcommandBuilder()
		.setName("user")
		.setDescription("Display user's scores")
		.addStringOption((option) =>
			option
				.setName("user")
				.setDescription("The relevant user")
				.setRequired(true),
		),
};