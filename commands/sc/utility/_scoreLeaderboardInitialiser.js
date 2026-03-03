const {
  SlashCommandSubcommandBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "leaderboard",
  data: new SlashCommandSubcommandBuilder()
    .setName("leaderboard")
    .setDescription("Display leaderboard of submitted scores")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("exercise")
        .setDescription("The relevant exercise leaderboard")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement),
    ),

  async execute(interaction) {
    const exercise = interaction.options.addStringOption("exercise");
    // ...functionality
  },
};
