import React, { Dispatch } from "react";
import { params } from "src/constants";
import mo from "memoize-one";

export const initialState = {
  play: false,
  x: 20,
  v: 18,
  v0: 18,
  time: 0,
  connected: false,
  g1: 0.3,
  g2: -0.3,
  l: params.total * 0.3
};

export type State = typeof initialState;
type ActionTypes =
  | {
      type: "TICK";
      payload: number;
    }
  | { type: "SET_V0"; payload: number }
  | { type: "SET_G1"; payload: number }
  | { type: "SET_G2"; payload: number }
  | { type: "SET_L"; payload: number }
  | { type: "SET_X"; payload: number }
  | { type: "RESTART" }
  | { type: "RESET" }
  | { type: "SET_PLAY"; payload: boolean };

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "TICK":
      let connected = getConnected(state);
      let dt = action.payload;
      return {
        ...state,
        v: !connected ? state.v0 : state.v - dt * params.a,
        x: state.x + dt * state.v + (connected ? -dt * dt * params.a * 0.5 : 0),
        time: state.time + dt
      };
    case "SET_PLAY":
      return {
        ...state,
        play: action.payload
      };
    case "SET_V0":
      return {
        ...state,
        v0: action.payload
      };
    case "SET_G1":
      return {
        ...state,
        g1: action.payload
      };
    case "SET_G2":
      return {
        ...state,
        g2: action.payload
      };
    case "SET_L":
      return {
        ...state,
        l: action.payload
      };
    case "SET_X":
      return {
        ...state,
        x: action.payload
      };
    case "RESTART":
      return {
        ...state,
        time: 0,
        x: 0,
        v: state.v0
      };
    case "RESET":
      return {
        ...state,
        time: 0,
        x: 0,
        v: state.v0
      };
    default:
      return state;
  }
};

export const getA = mo((state: State) => (state.g2 - state.g1) / 2 / state.l);
export const getX0 = mo(
  (state: State) =>
    (-params.total * state.g2) / (state.g1 - state.g2) - state.l / 2
);
export const getR = mo((state: State, x?: number) => {
  let x0 = getX0(state);
  x = typeof x === "undefined" ? state.x : x;
  if (x < x0) return state.g1;
  if (x > x0 + state.l) return state.g2;
  return 2 * (x - x0) * getA(state) + state.g1;
});

export const getRDegrees = mo(
  (state: State, x?: number) => (Math.atan(getR(state, x)) * 180) / Math.PI
);
export const getRRadians = mo((state: State) => Math.atan(getR(state)));

export const getY = mo((state: State, cx?: number) => {
  let x0 = getX0(state),
    x = typeof cx === "undefined" ? state.x : cx;
  if (x < x0) return x * state.g1;
  if (x > x0 + state.l) return state.g2 * (x - params.total);
  return (x - x0) * (x - x0) * getA(state) + state.g1 * x;
});

export const getXMax = mo(
  (state: State) => getX0(state) - state.g1 / getA(state) / 2
);

export const getConnected = mo((state: State) => {
  // if (state.x > getX0(state)) return true;
  let xb = params.block.x;
  let yb = getY(state, xb) + params.block.height;
  let { mt, x, y, xt } = getTangent(state);
  // console.log(xt);
  return (xb - x) * mt + y < yb || xb < xt;
});

export const getBlockTangent = mo((state: State) => {
  let x = params.block.x;
  let y = getY(state, x) + params.block.height;
  let a = getA(state);
  let b = state.g1;
  let x0 = getX0(state);
  let xt = x + Math.sqrt((a * (x - x0) * (x - x0) + b * x - y) / a);
  let yt = getY(state, xt);
  let mt = (yt - y) / (xt - x);
});

export const getTangent = mo((state: State) => {
  let r = getRRadians(state);
  let x =
    state.x +
    (Math.cos(r) * params.car.width) / 2 -
    params.car.height * Math.sin(r);
  let y =
    getY(state) +
    (Math.sin(r) * params.car.width) / 2 +
    params.car.height * Math.cos(r);
  let a = getA(state);
  let b = state.g1;
  let x0 = getX0(state);
  let xt = x + Math.sqrt((a * (x - x0) * (x - x0) + b * x - y) / a);
  let yt = getY(state, xt);
  let mt = (yt - y) / (xt - x);
  // let
  return { x, y, xt, yt, mt };
});

export const AppContext = React.createContext<{
  state: State;
  dispatch?: Dispatch<ActionTypes>;
}>({ state: initialState, dispatch: null });

// export const getxssd = mo(
//   (v0: number) => v0 * params.tp + (v0 * v0) / 2 / params.a
// );
