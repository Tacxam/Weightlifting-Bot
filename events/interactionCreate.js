const { Events, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const handlers = new Collection();

// Require handlers
const handlersPath = path.join(__dirname, "handlers");
const handlerFiles = fs
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(".js"));
// For each file get their filePaths and put the handler file objects into a temporary variable 'handler' before putting them into the handlers Collection
for (const file of handlerFiles) {
  const filePath = path.join(handlersPath, file);
  const handler = require(filePath);

  handlers.set(file.replace(".js", ""), handler);
}

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Handle Slash Commands
    if (interaction.isChatInputCommand()) {
      const handler = handlers.get("chatCommandHandler");
      await handler(interaction);
      return;
    }
  },
};
