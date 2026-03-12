const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "userScores",
  data: new SlashCommandBuilder()
    .setName("userscores")
    .setDescription("Display user's PRs")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The relevant user")
        .setRequired(true),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    const redisKey = `user:${user.id}:lifts`;

    let content = "";

    // Database handling
    const { redis } = interaction.client;
    const lifts = await redis.hGetAll(redisKey);

    if (Object.keys(lifts).length === 0) {
      return interaction.reply({
        content: `${user} has not recorded any lifts.`,
        allowedMentions: { parse: [] }
      });
    }

    for (const [field, value] of Object.entries(lifts)) {
      const lift = JSON.parse(value);

      content += `${field} - ${lift.weight}kg\n`;
    }

    interaction.reply({
      content: `**${user}'s scores:**\n${content}`,
      allowedMentions: { users: [] },
    });
  },
};
