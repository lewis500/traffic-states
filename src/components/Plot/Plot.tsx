import React, {
  createElement as CE,
  FunctionComponent,
  useContext
} from "react";
import * as params from "../../constants";
import { AppContext } from "src/ducks";
import { scaleLinear } from "d3-scale";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import useStyles from "./stylePlot";
import simplify from "simplify-js";
import Vis from "src/components/Vis/Vis2";

const WIDTH = 700,
  HEIGHT = 350,
  M = {
    top: 10,
    bottom: 10,
    left: 20,
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
  // getTranslate = memoizeone((vpx, xpx) => `translate(${vpx},${xpx})`),
  gTranslate = `translate(${M.left},${M.top})`,
  range = Array.apply(null, { length: 50 }).map(
    (d: {}, i: number) => i
  ) as number[],
  Mask = (
    <mask id="myMask">
      <rect width={WIDTH} height={HEIGHT} fill="white" />
    </mask>
  );
const TAxis = React.memo(({ mathClass }: { mathClass: string }) => (
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
));
const XAxis = React.memo(({ mathClass }: { mathClass: string }) => (
  <g>
    <path d={`M0,0L0,${HEIGHT}`} fill="none" stroke="black" />
    <foreignObject width="90" height="75" transform={`translate(5,-10)`}>
      <span className={mathClass}>
        <TeX math="x \; \text{(m)}" />
      </span>
    </foreignObject>
  </g>
));

const Trajectory: FunctionComponent<{
  trajectory: [number, number][];
  className: string;
}> = React.memo(({ trajectory, className }) =>
  CE("path", {
    className,
    d: simplify(
      trajectory.map(([t, x]) => ({ x: tScale(t), y: xScale(x) })),
      0.5
    ).reduce((a, { x, y }) => a + x + "," + y + " ", "M")
  })
);

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

const Marker = React.memo(({ className }: { className: string }) => {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 15 15"
        refY="5"
        refX="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
        className={className}
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
  );
});
const EMPTY = {};
const maskStyle = { mask: "url(#myMask)" };
const Plot: FunctionComponent = () => {
  const classes = useStyles(EMPTY),
    { state } = useContext(AppContext);

  return (
    <svg className={classes.svg} style={svgProps}>
      <Marker className={classes.marker} />
      <g transform={gTranslate}>
        {Mask}
        <g transform={`translate(${tScale(state.time)},${HEIGHT}) rotate(-90)`}>
          <Vis height={30} width={HEIGHT} />
        </g>
        {/* <Vis */}

        <g style={maskStyle}>
          {state.history.map((trajectory, i) =>
            CE(Trajectory, {
              className: classes.trajectory,
              trajectory,
              key: i
            })
          )}
        </g>
        <TAxis mathClass={classes.math} />
        <XAxis mathClass={classes.math} />
      </g>
    </svg>
  );
};
export default Plot;
