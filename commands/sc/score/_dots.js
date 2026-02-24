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

module.exports = {
	name: "dots",
	data: new SlashCommandSubcommandBuilder()
	.setName("dots")
	.setDescription("Calculate your DOTS score")
}