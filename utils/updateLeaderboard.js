async function updateLeaderboardMessage(client, redis, exercise) {
	const channel = await redis.get(`lbchannel:${exercise}`);
	const msg = await redis.get(`lbmsg:${exercise}`);

	const top = await redis.zRevRangeWithScores(exercise, 0, 9);

	let content = `**${exercise} Leaderboard (Top 10):**`;
	if (!top.length) {
		content = "No content yet";
	}

	
}