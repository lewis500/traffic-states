import React, { Dispatch } from "react";
import * as params from "src/constants";
import mo from "memoize-one";

const vs = (() => {
  let { sj, w, vf } = params;
  return (s: number) => Math.max(Math.min(vf, (s / sj - 1) * w), 0);
})();

export const initialState = {
  play: false,
  cars: [] as number[],
  time: 0,
  numCars: 0,
  history: [] as number[][]
};

export const getGreen = mo(
  (time: number, cycle: number) => time % cycle < cycle / 2
);

export type State = typeof initialState;
type ActionTypes =
  | {
      type: "TICK";
      payload: number;
    }
  | {
      type: "ADD";
    }
  | { type: "SET_V0"; payload: number }
  | { type: "RESTART" }
  | { type: "RESET" }
  | { type: "SET_PLAY"; payload: boolean };

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "TICK":
      let δ = action.payload,
        green = getGreen(state.time, params.cycle),
        cars = state.cars
          .map((x, i, arr) => {
            let nextX = i === 0 ? Infinity : arr[i - 1];
            if (!green && x <= params.light)
              nextX = Math.min(nextX, params.light + params.sj);
            return Math.min(nextX, x + vs(nextX - x) * δ);
          })
          .filter(d => d < params.total);
      // state
      // console.log(state.numCars-cars.length)
      let l = cars.length;
      let n = state.numCars;
      let history = state.history.map((d, i) => {
        if (i < n - l) return d;
        return [...d, cars[i - n + l]];
      });

      return {
        ...state,
        history,
        cars,
        time: state.time + δ
      };
    case "ADD":
      console.log(state.history);
      let newCar = Math.min(
        -params.vf / params.Q + state.cars[state.cars.length - 1] - 1 || -20,
        -20
      );

      return {
        ...state,
        numCars: state.numCars + 1,
        history: [...state.history, [newCar]],
        cars: [...state.cars, newCar]
      };
    case "SET_PLAY":
      return {
        ...state,
        play: action.payload
      };
    case "RESET":
      return {
        ...state,
        time: 0,
        cars: [] as number[]
      };
    default:
      return state;
  }
};

export const AppContext = React.createContext<{
  state: State;
  dispatch?: Dispatch<ActionTypes>;
}>({ state: initialState, dispatch: null });

// export const getxssd = mo(
//   (v0: number) => v0 * params.tp + (v0 * v0) / 2 / params.a
// );
