const ffmiCategories = [
  { name: "Below Average", limit: 18 },
  { name: "Average", limit: 20 },
  { name: "Above Average", limit: 22 },
	{ name: "Muscular", limit: 24 },
	{ name: "Very Muscular", limit: 26 },
	{ name: "Suspiciously Muscular", limit: 28 },
];

function getFFMI(height, bodyweight, bodyFat) {
	heightMeters = height / 100;
	bodyFatPercent = bodyFat / 100

	fatFreeMass = bodyweight * (1 - bodyFatPercent);

	ffmiBasic = fatFreeMass/(heightMeters * heightMeters);

	ffmi = ffmiBasic + 6.1 * (1.8 - heightMeters);

  const category = bmiCategories.find((c) => bmi <= c.limit);

	roundedFFMI = ffmi.toFixed(1);

  let content = `FFMI for Height: **${height}cm**, Bodyweight: **${bodyweight}kg** and BF%: **${bodyFatPercent}** is **${roundedBMI}**. This is considered **`;

	content += category ? category.name + "**" : "Very Suspicious**";

	return content;
}

module.exports = { ffmiCategories, getFFMI };
