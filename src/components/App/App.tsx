import React, { FunctionComponent, useContext, useReducer } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useInterval, useTimer } from "src/useTimerHook";
import Vis from "src/components/Vis";
import * as params from "src/constants";
import { AppContext, reducer, initialState } from "src/ducks";
// import TeX from "@matejmazur/react-katex";
// import Sliders from "src/components/Sliders";
import useStyles from "./styleApp";

const EMPTY = {};
const App: FunctionComponent<{}> = () => {
  const { state, dispatch } = useContext(AppContext),
    { play } = state,
    classes = useStyles(EMPTY);

  useTimer((dt: number) => {
    dt /= params.delta;
    dispatch({ type: "TICK", payload: Math.min(dt, 300) });
  }, play);

  useInterval(
    () => dispatch({ type: "ADD" }),
    (1 / params.Q) * params.delta,
    play
  );

  return (
    <div className={classes.main}>
      <div className={classes.visContainer}>
        <Vis />
      </div>
      <Paper className={classes.paper} elevation={2}>
        {/* <Sliders /> */}
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => dispatch({ type: "SET_PLAY", payload: !play })}
        >
          {play ? "PAUSE" : "PLAY"}
        </Button>
        <Button
          className={classes.button}
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
        >
          Reset
        </Button>
      </Paper>
    </div>
  );
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <App />
    </AppContext.Provider>
  );
};
