import React, {
  createElement as CE,
  FunctionComponent,
  useLayoutEffect,
  useRef,
  useContext,
  Dispatch
} from "react";
import * as params from "../../constants";
import { select, event } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { AppContext } from "src/ducks";
import { scaleLinear } from "d3-scale";
import memoizeone from "memoize-one";
import { drag } from "d3-drag";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import useStyles from "./stylePlot";

const WIDTH = 400,
  HEIGHT = (WIDTH * 2) / 3,
  M = {
    top: 10,
    bottom: 40,
    left: 40,
    right: 10
  },
  svgProps = {
    width: WIDTH + M.left + M.right,
    height: HEIGHT + M.top + M.bottom
  },
  xScale = scaleLinear()
    .domain([0, params.total])
    .range([HEIGHT, 0]),
  tScale = scaleLinear()
    .domain([0, 2 * params.cycle])
    .range([0, WIDTH]),
  xAxis = axisLeft(xScale),
  tAxis = axisBottom(tScale),
  getTranslate = memoizeone((vpx, xpx) => `translate(${vpx},${xpx})`),
  range = Array.apply(null, { length: 50 }).map(
    (d: {}, i: number) => i
  ) as number[],
  Mask = (
    <mask id="myMask">
      <rect width={WIDTH} height={HEIGHT} fill="white" />
    </mask>
  );
const Plot: FunctionComponent = () => {
  const classes = useStyles({}),
    gXAxis = useRef<SVGGElement>(),
    gTAxis = useRef<SVGGElement>(),
    { state, dispatch } = useContext(AppContext);

  useLayoutEffect(() => {
    select(gXAxis.current).call(xAxis);
    select(gTAxis.current).call(tAxis);
  }, []);
  return (
    <svg className={classes.svg}>
      <g transform={getTranslate(M.left, M.top)}>
        {Mask}
        <rect className={classes.hidden} width={WIDTH} height={HEIGHT} />
        <g ref={gXAxis} />
        <g ref={gTAxis} transform={getTranslate(0, HEIGHT)} />
      </g>
    </svg>
  );
};
export default Plot;
