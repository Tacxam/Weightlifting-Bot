const { createClient } = require("redis");

async function redis() {
	const client = await createClient({
		url: "redis://localhost:8081"
	})
		.on("error", (err) => console.log("Redis Client Error", err))
		.connect();

	await client.set("key", "value");
	const value = await client.get("key");
	client.destroy();
}

redis();