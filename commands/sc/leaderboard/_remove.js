const { SlashCommandSubcommandBuilder } = require("discord.js");

// Delete score from leaderboard
module.exports = {
  name: "delscore",
  data: new SlashCommandSubcommandBuilder()
    .setName("delscore")
    .setDescription("Delete a score from the leaderboard.")
    .addStringOption((option) =>
      option
        .setName("exercise")
        .setDescription("The exercise score that is being deleted")
        .setRequired(true),
    ),
  async execute(interaction) {
    const exercise = interaction.option.getString("exercise");

    // ...Database interaction
  },
};
