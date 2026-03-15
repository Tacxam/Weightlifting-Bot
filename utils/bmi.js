const bmiCategories = [
  { name: "Underweight", limit: 18.5 },
  { name: "Normal", limit: 24.9 },
  { name: "Overweight", limit: 29.9 },
];

function getBMI(height, bodyweight) {
	heightMeters = height / 100;
  const bmi = (bodyweight / (heightMeters * heightMeters));
  const category = bmiCategories.find((c) => bmi <= c.limit);

	roundedBMI = bmi.toFixed(1);

  let content = `BMI for Height: **${height}cm** and Bodyweight: **${bodyweight}kg** is **${roundedBMI}**. This is considered **`;

	content += category ? category.name + "**" : "Obese**";

	return content;
}

module.exports = { bmiCategories, getBMI };
