const dotsCoefficients = {
  Male: {
    a: -307.75076,
    b: 24.0900756,
    c: -0.1918759221,
    d: 0.0007391293,
    e: -0.000001093,
  },
  Female: {
    a: -57.96288,
    b: 13.6175032,
    c: -0.1126655495,
    d: 0.0005158568,
    e: -0.0000010706,
  },
};

function dotsCalculator(total, gender, bodyWeight) {
  // Dynamic lookup (dotsCoefficients[gender])
  const { a, b, c, d, e } = dotsCoefficients[gender];

  const denominator =
    a +
    b * bodyWeight +
    c * bodyWeight ** 2 +
    d * bodyWeight ** 3 +
    e * bodyWeight ** 4;

  dots = ((500 * total) / denominator).toFixed(2);

  return dots;
}

module.exports = { dotsCalculator }