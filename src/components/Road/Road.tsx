import React, {
    createElement as CE,
    FunctionComponent,
    useContext,
    useMemo
  } from "react";
  import { scaleLinear } from "d3-scale";
  import { AppContext, State, getGreen } from "src/ducks";
  import useStyles from "./styleVis";
  import * as params from "src/constants";
  // import mo from "memoize-one";
  
  const Vis: FunctionComponent<{ width: number; height: number }> = ({
    width,
    height
  }) => {
    const { state } = useContext(AppContext),
      classes = useStyles({
        width,
        height,
        isGreen: getGreen(state.time, params.cycle)
      }),
      xScale = useMemo(
        () =>
          scaleLinear()
            .range([0, width])
            .domain([0, params.total]),
        [width]
      ),
      yScale = useMemo(
        () =>
          scaleLinear()
            .range([height, 0])
            .domain([0, 2 * params.roadWidth]),
        [height]
      );
    const [light, roadWidth, carLength, carHeight] = useMemo(
      () => [
        xScale(params.light),
        height - yScale(params.roadWidth),
        xScale(params.carLength),
        height - yScale(params.carHeight)
      ],
      [xScale, yScale]
    );
    const [roadPath, lightPath] = useMemo(
      () => [
        `M0,0L${width},0 M${light + roadWidth / 2},${-height / 2}L${light +
          roadWidth / 2},${height / 2}`,
        `M${light + 2},${-roadWidth / 2}L${light + 2},${roadWidth / 2}`
      ],
      [width, height]
    );
  
    return (
      <g transform={`translate(0,${height / 2 - roadWidth / 2})`}>
        <path className={classes.road} d={roadPath} strokeWidth={roadWidth} />
        <path className={classes.light} d={lightPath} />
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
  