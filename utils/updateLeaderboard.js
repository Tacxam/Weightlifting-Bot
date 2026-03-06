async function updateLeaderboardMessage(client, redis, exercise) {
  const channelId = await redis.get(`lbchannel:${exercise}`);
  const msgId = await redis.get(`lbmsg:${exercise}`);

  const top = await redis.zRevRangeWithScores(exercise, 0, 9);

  let content = `**${exercise} Leaderboard (Top 10):**`;
  if (!top.length) {
    content = "No content yet";
  }

  // Map each array user and score to a string
  content += top
    .map(
      (element, index) =>
        `${index + 1}. <@${element.value} - **${element.score}**`,
    )
    .join("\n");

  // Find channel
  const channel = await client.channels.fetch(channelId);
  if (!channel?.isTextBased()) return;

  const msg = await channel.messages.fetch(msgId);
  await msg.edit({ content });
}

module.exports = { updateLeaderboardMessage };