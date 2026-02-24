const { SlashCommandBuilder, Collection, PermissionFlagsBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const subcommands = new Collection();

// Pull subcommands
const subcommandPath = path.join(__dirname, "../sc/admin");
const subcommandFiles = fs
  .readdirSync(subcommandPath)
  .filter((file) => file.endsWith(".js"));
for (const file of subcommandFiles) {
  const filePath = path.join(subcommandPath, file);
  const subcommand = require(filePath);
  subcommand.filePath = filePath;

  subcommands.set(subcommand.data.name, subcommand);
}

// Create the builder data
const builder = new SlashCommandBuilder()
  .setName("admin")
  .setDescription("...")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

for (const subcommand of subcommands.values()) {
  builder.addSubcommand(subcommand.data);
}

// Export
module.exports = {
  name: "admin",
  data: builder,

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const subHandler = subcommands.get(sub);

    return subHandler?.execute(interaction);
  },
};
