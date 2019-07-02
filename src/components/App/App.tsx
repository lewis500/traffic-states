import React, { FunctionComponent, useContext, useReducer } from "react";
import Button from "@material-ui/core/Button";
import { colors } from "@material-ui/core";
// import { withStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useTimer from "src/useTimerHook";
import Vis from "src/components/Vis";
// import Plot from "src/components/Plot";
import { params } from "src/constants";
import { makeStyles } from "@material-ui/styles";
import { AppContext, reducer, initialState } from "src/ducks";
// import TeX from "@matejmazur/react-katex";
import Sliders from "src/components/Sliders";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: "0 !important",
      padding: "0 !important",
      fontFamily: " 'Puritan', sans-serif"
    }
  },
  main: {
    maxWidth: "900px",
    color: colors.grey["800"],
    margin: "0 auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column"
  },
  red: {
    fill: colors.red["A400"]
  },
  paper: {
    maxWidth: "500px",
    width: 300,
    margin: "auto",
    display: "flex",
    padding: "24px 36px",
    flexDirection: "column"
  },
  button: {
    alignSelf: "center"
  },
  visContainer: {
    margin: "0 auto"
  },
  sliderContainer: {
    width: "300px",
    padding: "20px",
    boxSizing: "border-box"
  }
});

const EMPTY = {};
const App: FunctionComponent<{}> = () => {
  const { state, dispatch } = useContext(AppContext);
  const { x, l, g1, g2, play } = state;

  const classes = useStyles(EMPTY);

  useTimer((dt: number) => {
    dt /= params.delta;
    if (x < params.total && state.v > 0) {
      dispatch({ type: "TICK", payload: dt });
    } else {
      dispatch({ type: "RESTART" });
    }
  }, play);

  return (
    <div className={classes.main}>
      <div className={classes.visContainer}>
        <Vis />
      </div>
      <Paper className={classes.paper} elevation={2}>
        <Sliders />
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
