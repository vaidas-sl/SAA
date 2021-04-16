type WeightFn = (x: number) => number;

const sum = (data: number[]) => data.reduce((a, b) => a + b, 0);

export const gaussian = (x: number, Q = 1, u = 0) =>
  Math.E ** ((-1 / (2 * Q ** 2)) * (x - u) ** 2) / (Math.sqrt(2 * Math.PI) * Q);

export const ma = (data: number[], K: number) =>
  data
    .slice(K, data.length - K - 1)
    .map((_, idx) => sum(data.slice(idx, idx + K + 1)) / (2 * K + 1));

const weightedSum = (data: number[], weights: number[]) =>
  data.reduce((acc, val, idx) => acc + val * weights[idx], 0);

// K > 1 ; L > 0
export const wma = (data: number[], K: number, L: number) => {
  const x_k = Math.sqrt(2 * Math.log(L));
  const get_x_j = (j: number) => (j * x_k) / K;
  const x_j_list = Array(2 * K + 1)
    .fill(0)
    .map((_, idx) => get_x_j(idx - K));
  const p_list = x_j_list.map((x) => gaussian(x));
  const weights = p_list.map((x) => x / sum(p_list));

  const averagedData = data
    .slice(K, data.length-K)
    .map((_, idx) => weightedSum(data.slice(idx, idx + 2*K + 1), weights));

  return [...Array(K).fill(0), ...averagedData, ...Array(K).fill(0)];
};

// 0 <= alfa <= 1
export const ema = (data: number[], alfa: number) =>
  data
    .slice(1)
    .reduce(
      (acc, value, idx) => [...acc, (1 - alfa) * acc[idx] + alfa * value],
      [data[0]]
    );
