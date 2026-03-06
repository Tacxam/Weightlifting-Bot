const {
  SlashCommandSubcommandBuilder,
  ChannelType,
  MessageFlags,
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
      content: `**${exercise} Leaderboard (Top 10):**\n`
    })
    
    // Set pointer to channel and message
    const { redis } = interaction.client;

    await redis.set(`lbchannel:${exercise}`, channel.id);
    await redis.set(`lbmsg:${exercise}`, msg.id);

    return interaction.reply({
      content: `Leaderboard created in ${channel} for **${exercise}**.`,
      flags: MessageFlags.Ephemeral,
    })
  },
};
