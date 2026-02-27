const divisions = {
  Male: [59, 66, 74, 83, 93, 105, 120],
  Female: [47, 52, 57, 63, 69, 76, 84],
};

function getWeightDivision(weight, gender) {
  const weightClasses = divisions[gender];
  const result = weightClasses.find((limit) => weight <= limit);
  // If result it truthy, return result, otherwise return "last division +"
  return result ? `${result}` : `${weightClasses.at(-1)}+`;
}

module.exports = { divisions, getWeightDivision };
