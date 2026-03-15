// This handles all the updating of both score and powerlifting leaderboards
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
  const channelId = await redis.get(`lbchannel:powerlifting`);
  const msgId = await redis.get(`lbmsg:powerlifting`);

  if (!channelId || !msgId) return;

  const top = await redis.zRangeWithScores(`powerlifting`, 0, 9, {
    REV: true,
  });

  let content = `**Powerlifting Leaderboard (Top 10 DOTS):**\n`;
  if (!top.length) {
    content += "No scores yet";
  } else {
    let index = 1;

    for (const user of top) {
      const userId = user.value;
      const dots = user.score;

      const json = await redis.hGet(`user:${userId}:lifts`, "powerlifting");

      const lifts = JSON.parse(json);

      content += `${index}. <@${userId}> - **Bench:** ${lifts.bench} **Squat:** ${lifts.squat} **Deadlift:** ${lifts.deadlift} - **DOTS: ${dots}**\n`;
      index++;
    }
  }

  // Find channel
  const channel = await client.channels.fetch(channelId);
  if (!channel?.isTextBased()) return;

  const msg = await channel.messages.fetch(msgId);
  await msg.edit({ content });
}

module.exports = { updateLeaderboardMessage, updateLeaderboardPL };
