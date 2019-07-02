import { makeStyles, colors } from "@material-ui/core";
export default makeStyles({
  road: {
    fill: colors.grey["200"]
  },
  svg: {
    display: "inline-block",
    margin: "30px 0",
    "& text": {
      fontFamily: "Puritan, san-serif",
      fontSize: "13px"
    }
  },
  tangent: {
    stroke: colors.pink["A700"],
    strokeWidth: "2px",
    fill: "none"
  },
  connected: {
    stroke: colors.pink["A200"],
    strokeDasharray: "2, 2"
  },
  text: {
    textAlign: "center",
    fontSize: "12px",
    fontFamily: "Puritan, sans-serif"
  },
  car: {
    fill: colors.lightBlue["A400"]
  },
  block: {
    fill: colors.green["A700"]
  }
});
