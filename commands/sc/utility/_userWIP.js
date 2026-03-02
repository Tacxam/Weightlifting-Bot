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
    .setDescription("Display user's PRs")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The relevant user")
        .setRequired(true),
    ),

  async execute(interaction) {
		const user = interaction.options.getUser("user");

		const redisKey = `user:${user}:lifts`;

    // Database handling
    const { redis } = interaction.client;
		const scores = await redis.hGetAll(redisKey)

		if (scores === 0) {
			return interaction.reply({
				content: `${user} has not recorded any lifts.`,
			})
		}

    for (const score of scores) {
			const exercise = choice.value;
			const score = await redis.zScore(`${exercise}`, user.id);

			// If score exists, add to array
			if (score !== null) {
				scores.push({name: choice.name, score: score})
			}
		}

		let content;
	},
};
