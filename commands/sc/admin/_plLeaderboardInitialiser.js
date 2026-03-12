const {
  SlashCommandSubcommandBuilder,
  ChannelType,
  MessageFlags,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");
const { updateLeaderboardPL } = require("../../../utils/updateLeaderboard.js")

// Initialises a /score leaderboard to specific channel
module.exports = {
  name: "leaderboardpl",
  data: new SlashCommandSubcommandBuilder()
    .setName("leaderboardpl")
    .setDescription("Initialise a leaderboard of submitted scores.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The relevant channel to place leaderboard.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement),
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const exercise = interaction.options.getString("exercise");

    const msg = await channel.send({
      content: `**Powerlifting Leaderboard (Top 10 DOTS):**\n`
    })

    // Set pointer to channel and message
    const { redis } = interaction.client;

    await redis.set(`lbchannel:powerlifting`, channel.id);
    await redis.set(`lbmsg:powerlifting`, msg.id);

    updateLeaderboardPL(interaction.client, redis);

    return interaction.reply({
      content: `Leaderboard created in ${channel} for Powerlifting.`,
      flags: MessageFlags.Ephemeral,
      allowedMentions: { users: [] },
    })
  },
};
