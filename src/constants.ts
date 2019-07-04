export const total = 400;
export const light = total * 0.8;
export const vf = (80 * 1000) / 3600; /* 60 kph to m/s */
export const sj = 4;
export const kj = 1 / sj;
export const k0 = kj / 3;
export const q0 = vf * k0;
export const w = q0 / (kj - k0);
export const carLength = 3;
export const carHeight = 2;
export const roadWidth = 10;
export const delta = 0.2;
export const Q = q0 * 0.494;

// export const locs = {
//   total: 200,
//   light: 150
// };
