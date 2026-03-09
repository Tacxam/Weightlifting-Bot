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
const genderDivisions = require("../../../utils/genderDivisions.js")

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
      .addChoices(...genderDivisions))
  .addNumberOption((option) =>
    option
      .setName("userweight")
      .setDescription("The user's bodyweight")
      .setRequired(true))
  .addNumberOption((option) =>
    option
      .setName("bench")
      .setDescription("The weight being submitted for bench")
      .setRequired(true))
  .addNumberOption((option) =>
    option
      .setName("squat")
      .setDescription("The weight being submitted for squat")
      .setRequired(true))
  .addNumberOption((option) =>
    option
      .setName("deadlift")
      .setDescription("The weight being submitted for deadlift")
      .setRequired(true))

  async execute(interaction) {

  }
}