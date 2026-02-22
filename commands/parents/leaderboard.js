const { SlashCommandBuilder, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const subcommands = new Collection();

// Pull subcommands
const subcommandPath = path.join(__dirname, "../sc/leaderboard");
const subcommandFiles = fs
  .readdirSync(subcommandPath)
  .filter((file) => file.endsWith(".js"));
for (const file of subcommandFiles) {
  const filePath = path.join(subcommandPath, file);
  const subcommand = require(filePath);
  subcommand.filePath = filePath;

  subcommands.set(subcommand.data.name, subcommand);

	// Create builder data
	const builder = new SlashCommandBuilder()
		.setName("l")
		.setDescription("...")
		
		for (const subcommand of subcommands.values()) {
			builder.addSubcommand(subcommand.data);
		}

		// Export
		module.exports = {
			name: "leaderboard",
			data: builder,

			async execute(interaction) {
				const sub = interaction.options.getSubcommand();
				const subHandler = subcommands.get(sub);

				return subHandler?.execute(interaction);
			}
		}
}
