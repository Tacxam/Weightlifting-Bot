const {
  SlashCommandSubcommandBuilder,
  ChannelType,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

// Displays Leaderboard
module.exports = {
  name: "leaderboard",
  data: new SlashCommandSubcommandBuilder()
    .setName("leaderboard")
    .setDescription("Initialise a leaderboard of submitted scores.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The relevant channel to place leaderboard.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement),
    )
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise being leaderboarded.")
        .setRequired(true)
        .addChoices(...exerciseChoices),
    ),
    
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const exercise = interaction.options.getString("exercise");

    const msg = await channel.send({
      content: `**${exercise} Leaderboard (Top 10)**\n`
    })
    
    // ...functionality
  },
};
