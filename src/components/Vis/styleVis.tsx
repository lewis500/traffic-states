import { colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
type Props = { width: number; height: number; isGreen: boolean };

export default makeStyles({
  road: {
    fill: colors.grey["700"]
  },
  svg: ({ width, height }: Props) => ({
    width,
    height,
    display: "block",
    margin: "30px 0",
    "& text": {
      fontFamily: "Puritan, san-serif",
      fontSize: "13px"
    }
  }),
  light: {
    strokeWidth: "3px",
    fill: "none",
    stroke: ({ isGreen }: Props) =>
      isGreen ? colors.green["A400"] : colors.red["A400"]
  },
  text: {
    textAlign: "center",
    fontSize: "12px",
    fontFamily: "Puritan, sans-serif"
  },
  car: {
    fill: colors.yellow["A700"],
    rx: 2,
    ry: 1,
    // stroke: "white"
  }
});
