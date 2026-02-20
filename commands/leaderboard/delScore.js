const { SlashCommandBuilder } = require("discord.js");

// Delete score from leaderboard
module.exports = {
  data: new SlashCommandBuilder()
    .setName("delscore")
    .setDescription("Delete a score from the leaderboard.")
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
