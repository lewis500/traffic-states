import React, {
  createElement as CE,
  FunctionComponent,
  useLayoutEffect,
  useRef,
  useContext,
  Dispatch
} from "react";
import * as params from "../../constants";
import { AppContext } from "src/ducks";
import { scaleLinear } from "d3-scale";
import memoizeone from "memoize-one";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import useStyles from "./stylePlot";
import { colors } from "@material-ui/core";

const WIDTH = 700,
  HEIGHT = 400,
  M = {
    top: 10,
    bottom: 40,
    left: 40,
    right: 44
  },
  svgProps = {
    width: WIDTH + M.left + M.right,
    height: HEIGHT + M.top + M.bottom
  },
  xScale = scaleLinear()
    .domain([0, params.total])
    .range([HEIGHT, 0]),
  tScale = scaleLinear()
    .domain([0, 2.5 * params.cycle])
    .range([0, WIDTH]),
  // xAxis = axisLeft(xScale),
  // tAxis = axisBottom(tScale),
  getTranslate = memoizeone((vpx, xpx) => `translate(${vpx},${xpx})`),
  range = Array.apply(null, { length: 50 }).map(
    (d: {}, i: number) => i
  ) as number[],
  Mask = (
    <mask id="myMask">
      <rect width={WIDTH} height={HEIGHT} fill="white" />
    </mask>
  ),
  TAxis = ({ mathClass }: { mathClass: string }) => (
    <g transform={`translate(0,${xScale(params.light)})`}>
      <path d={`M0,0L${WIDTH},0`} fill="none" stroke="black" />
      <foreignObject
        width="90"
        height="75"
        transform={`translate(${WIDTH + 3},-10)`}
      >
        <span className={mathClass}>
          <TeX math="t \; \text{(sec)}" />
        </span>
      </foreignObject>
    </g>
  ),
  XAxis = ({ mathClass }: { mathClass: string }) => (
    <g>
      <path d={`M0,0L0,${HEIGHT}`} fill="none" stroke="black" />
      <foreignObject width="90" height="75" transform={`translate(5,-10)`}>
        <span className={mathClass}>
          <TeX math="x \; \text{(m)}" />
        </span>
      </foreignObject>
    </g>
  );

const Trajectory: FunctionComponent<{
  trajectory: [number, number][];
  className: string;
}> = React.memo(({ trajectory, className }) => {
  // console.log('hello')
  return CE("path", {
    className,
    markerEnd: "url(#arrow)",
    d: "M" + trajectory.map(([t, x]) => [tScale(t), xScale(x)]).join("L")
  });
});

// const Trajectories: FunctionComponent<{
//   history: [number, number][][];
//   className: string;
// }> = ({ history, className }) =>
//   CE("path", {
//     className,
//     d:
//       "M" +
//       history
//         .map(h => {
//           return h.map(([t, x]) => [tScale(t), xScale(x)]).join("L");
//         })
//         .join("M")
//   });

const Plot: FunctionComponent = () => {
  const classes = useStyles({}),
    { state, dispatch } = useContext(AppContext);

  return (
    <svg className={classes.svg} style={svgProps}>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 15 15"
          refY="5"
          refX="8"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
          className={classes.marker}
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <g transform={getTranslate(M.left, M.top)}>
        <TAxis mathClass={classes.math} />
        <XAxis mathClass={classes.math} />
        {Mask}
        <g style={{ mask: "url(#myMask)" }}>
          {/* <Trajectories
            history={state.history}
            className={classes.trajectory}
          /> */}
          {state.history.map((d, i) => (
            <Trajectory className={classes.trajectory} trajectory={d} key={i} />
          ))}
          {/* <rect className={classes.hidden} width={WIDTH} height={HEIGHT} /> */}
        </g>
      </g>
    </svg>
  );
};
export default Plot;
