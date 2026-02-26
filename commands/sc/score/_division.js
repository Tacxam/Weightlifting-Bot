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
const genderDivisions = require("../../../utils/pendingDivisions.js");

module.exports = {
  name: "division",
  data: new SlashCommandSubcommandBuilder()
    .setName("division")
    .setDescription("Sets user competition division")
    .addStringOption((option) =>
      option
        .setName("gender")
        .setDescription("The gender being submitted")
        .setRequired(true)
        .addChoices(...genderDivisions),
    )
    .addStringOption((option) =>
      option
        .setName("weight")
        .setDescription("The user weight being submitted")
        .setRequired(true)
        .addChoices(...weightDivisions),
    ),

	async execute(interaction) {
		
	}
};
