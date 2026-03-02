const { SlashCommandSubcommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandSubcommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  cooldown: 5,
  async execute(interaction) {
    await interaction.reply("Don't ping me.");
  },
};
