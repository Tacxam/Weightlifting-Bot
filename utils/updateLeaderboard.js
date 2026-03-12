async function updateLeaderboardMessage(client, redis, exercise) {
  const channelId = await redis.get(`lbchannel:${exercise}`);
  const msgId = await redis.get(`lbmsg:${exercise}`);

  if (!channelId || !msgId) return;

  const top = await redis.zRangeWithScores(exercise, 0, 9, {
    REV: true,
  });

  let content = `**${exercise} Leaderboard (Top 10):**\n`;
  if (!top.length) {
    content += "No scores yet";
  }

  // Map each array user and score to a string
  else {
    content += top
      .map(
        (element, index) =>
          `${index + 1}. <@${element.value}> - **${element.score}**`,
      )
      .join("\n");
  }

  // Find channel
  const channel = await client.channels.fetch(channelId);
  if (!channel?.isTextBased()) return;

  const msg = await channel.messages.fetch(msgId);
  await msg.edit({ content });
}

async function updateLeaderboardPL(client, redis) {
  const top = await redis.zRangeWithScores(
    `powerlifting`,
    0,
    9,
    {
      REV: true,
    },
  );

  let content = `**Powerlifting Leaderboard (Top 10 DOTS):**\n`;
  if (!top.length) {
    content += "No scores yet";
  } else {
      for (const user of top) {
      const userId = user.value;
      const dots = user.score;
    }
  }

	return content;
}

module.exports = { updateLeaderboardMessage, updateLeaderboardPL };
