const {
  SlashCommandSubcommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  ComponentType,
} = require("discord.js");
const exerciseChoices = require("../../../utils/exerciseChoices.js");

module.exports = {
  name: "user",
  data: new SlashCommandSubcommandBuilder()
    .setName("user")
    .setDescription("Display user's scores")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The relevant user")
        .setRequired(true),
    ),

  async execute(interaction) {
		const user = interaction.options.getUser("user");

		const scores = [];

    // Database handling
    const { redis } = interaction.client;
    for (const choice of exerciseChoices) {
			const exercise = choice.value;
			const score = await redis.zScore(`${exercise}`, user.id);

			// If score exists, add to array
			if (score !== null) {
				scores.push({name: choice.name, score: score})
			}
		}

		let content;

		// If no scores
		if (scores.length === 0) {
			content = `${user} has no recorded scores`
		} else {
			let list = "";

			for (const score of scores) {
				list += `**${score.name}:** ${score.score}kg\n`
			}

			content = `**${user}'s scores:\n**` + list;
		}
	},
};
