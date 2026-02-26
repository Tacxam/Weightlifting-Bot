const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const {
  setPending,
  getPending,
  deletePending,
} = require("../../../utils/pendingSubmission.js");
const pendingDivision = require("../../../utils/pendingDivision.js")

module.exports = {
	name: "gender",
	data: new SlashCommandSubcommandBuilder()
		.setName("gender")
		.setDescription("Sets user gender")
		.addStringOption((option) => option
			.setName("gender")
			.setDescription("The gender being submitted")
			.setRequired(true)
			.addChoices(...genderDivision),
		),
}