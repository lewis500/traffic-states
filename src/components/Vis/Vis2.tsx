import React, {
  createElement as CE,
  FunctionComponent,
  useContext,
  useMemo
} from "react";
// import { params } from "src/constants";
import { scaleLinear } from "d3-scale";
import { AppContext, State, getGreen } from "src/ducks";
import useStyles from "./styleVis";
import * as params from "src/constants";
import mo from "memoize-one";

// const WIDTH = 800,
//   HEIGHT = 100,
// //   xScale = scaleLinear()
// //     .domain([0, params.total]),
//   yScale = scaleLinear()
//     .domain([0, (params.total * HEIGHT) / WIDTH]);
//   CAR_WIDTH = xScale(params.carLength),
//   CAR_HEIGHT = HEIGHT - yScale(params.carHeight),
//   ROAD_WIDTH = HEIGHT - yScale(params.roadWidth),
//   LIGHT = xScale(params.light);

// const Car: FunctionComponent<{
//   x: number;
//   className: string;
// }> = ({ x, className }) =>
//   CE("rect", {
//     width: CAR_WIDTH,
//     height: CAR_HEIGHT,
//     className,
//     y: HEIGHT / 2 - CAR_HEIGHT / 2,
//     x: x - CAR_WIDTH
//   });
// const measurements =

// const Roads: FunctionComponent<{ className: string }> = React.memo(({ className, width,light,height }) =>{
//     return
//   return CE(
//     "g",
//     {},
//     CE("rect", {
//       height: ROAD_WIDTH,
//       width: WIDTH,
//       className,
//       x: 0,
//       y: HEIGHT / 2 - ROAD_WIDTH / 2
//     }),
//     CE("rect", {
//       height: HEIGHT,
//       width: ROAD_WIDTH,
//       className,
//       x: LIGHT,
//       y: 0
//     })
//   ));
// }

// const lightPath = `M${LIGHT},${(HEIGHT - ROAD_WIDTH) / 2}L${LIGHT},${(HEIGHT +
//   ROAD_WIDTH) /
//   2}`;
// const Light: FunctionComponent<{ className: string }> = ({ className }) =>

const Vis: FunctionComponent<{ width: number; height: number }> = ({
  width,
  height
}) => {
  const { state } = useContext(AppContext),
    classes = useStyles({
      width,
      height,
      isGreen: getGreen(state.time, params.cycle)
    });
  const xScale = useMemo(
    () =>
      scaleLinear()
        .range([0, width])
        .domain([0, params.total]),
    [width]
  );
  const yScale = useMemo(
    () =>
      scaleLinear()
        .range([height, 0])
        .domain([0, 2 * params.roadWidth]),
    [height]
  );
  const light = xScale(params.light),
    roadWidth = height - yScale(params.roadWidth),
    carLength = xScale(params.carLength),
    carHeight = height - yScale(params.carHeight);

  return (
    <g transform={`translate(0,${height / 2 - roadWidth / 2})`}>
      <path
        className={classes.road}
        d={`M0,0L${width},0 M${light + roadWidth / 2},${-height / 2}L${light +
          roadWidth / 2},${height / 2}`}
        strokeWidth={roadWidth}
      />
      <path
        className={classes.light}
        d={`M${light + 2},${-roadWidth / 2}L${light + 2},${roadWidth / 2}`}
      />
      {state.cars.map((d, i) => (
        <rect
          key={i}
          className={classes.car}
          transform={`translate(${xScale(d) - carLength},${-carHeight / 2})`}
          width={carLength}
          height={carHeight}
        />
      ))}
    </g>
  );
};
export default Vis;
