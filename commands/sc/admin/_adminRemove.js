const { SlashCommandSubcommandBuilder } = require("discord.js");

// Delete score from leaderboard
module.exports = {
  name: "remove",
  data: new SlashCommandSubcommandBuilder()
    .setName("remove")
    .setDescription("Remove a score from the leaderboard. (Admin Only)")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose score is being deleted")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise score that is being deleted")
        .setRequired(true),
    ),
  async execute(interaction) {
    // Placeholder
  },
};
