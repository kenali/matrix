export const generateAmount = () => Math.floor(Math.random() * 900) + 100;

export const get60thPercentile = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const index = 0.6 * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  if (upper >= sorted.length) return sorted[lower];
  return parseFloat((sorted[lower] + weight * (sorted[upper] - sorted[lower])).toFixed(1));
};