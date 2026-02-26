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
const genderDivisions = require("../../../utils/genderDivisions.js");
const { maleWeightDivisions, femaleWeightDivisions } = require("../../../utils/weightDivisions.js")

module.exports = {
  name: "division",
  data: new SlashCommandSubcommandBuilder()
    .setName("division")
    .setDescription("Sets user competition division. (If don't want to share gender or weight, Select Open for gender and 0 for weight)")
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The gender being submitted")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addIntegerOption((option) =>
      option
        .setName("weight")
        .setDescription("The user weight being submitted")
        .setRequired(true)
    ),

	async execute(interaction) {
		// Handle determining weight class for inputted weight
    // Weight class is key, user is value
	}
};
