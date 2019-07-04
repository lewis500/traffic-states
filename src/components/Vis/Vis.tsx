import React, {
  createElement as CE,
  FunctionComponent,
  useContext
} from "react";
// import { params } from "src/constants";
import { scaleLinear } from "d3-scale";
import { AppContext, State, getGreen } from "src/ducks";
import useStyles from "./styleVis";
import * as params from "src/constants";

const WIDTH = 800,
  HEIGHT = 100,
  xScale = scaleLinear()
    .range([0, WIDTH])
    .domain([0, params.total]),
  yScale = scaleLinear()
    .range([HEIGHT, 0])
    .domain([0, (params.total * HEIGHT) / WIDTH]),
  CAR_WIDTH = xScale(params.carLength),
  CAR_HEIGHT = HEIGHT - yScale(params.carHeight),
  ROAD_WIDTH = HEIGHT-yScale(params.roadWidth),
  LIGHT = xScale(params.light);

const Car: FunctionComponent<{
  x: number;
  className: string;
}> = ({ x, className }) =>
  CE("rect", {
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    className,
    y: HEIGHT / 2 - CAR_HEIGHT/2,
    x: x - CAR_WIDTH
  });

const Roads: FunctionComponent<{ className: string }> = ({ className }) =>
  CE(
    "g",
    {},
    CE("rect", {
      height: ROAD_WIDTH,
      width: WIDTH,
      className,
      x: 0,
      y: HEIGHT / 2 - ROAD_WIDTH / 2
    }),
    CE("rect", {
      height: HEIGHT,
      width: ROAD_WIDTH,
      className,
      x: LIGHT,
      y: 0
    })
  );

const lightPath = `M${LIGHT},${(HEIGHT-ROAD_WIDTH)/2}L${LIGHT},${(HEIGHT+ROAD_WIDTH)/2}`;
const Light: FunctionComponent<{ className: string }> = ({ className }) =>
  CE("path", { className, d: lightPath });

const Vis: FunctionComponent<{}> = () => {
  const { state } = useContext(AppContext),
    classes = useStyles({
      width: WIDTH,
      height: HEIGHT,
      isGreen: getGreen(state.time, params.cycle)
    });

  return (
    <svg className={classes.svg}>
      <Roads className={classes.road} />
      <Light className={classes.light} />
      {state.cars.map((d, i) => (
        <Car key={i} x={xScale(d)} className={classes.car} />
      ))}
    </svg>
  );
};
export default Vis;
