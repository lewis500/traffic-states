import { makeStyles } from "@material-ui/styles";
import { colors } from "@material-ui/core";
export default makeStyles({
  svg: {
    "& text": {
      fontFamily: "Puritan, san-serif",
      fontSize: "13px"
    }
  },
  math: {
    fontSize: "12px"
  },
  trajectory: {
    fill: "none",
    stroke: colors.lightBlue["A700"],
    strokeWidth: "2px"
  },
  hidden: {
    fill: "white",
    opacity: 0
  },
  marker: {
    fill: colors.lightBlue["A700"]
  }
});
