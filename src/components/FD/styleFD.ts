import {makeStyles} from '@material-ui/styles';
import {color} from '@material-ui/core';

export default makeStyles({
      svg: {
        width: WIDTH + M.left + M.right,
        height: HEIGHT + M.top + M.bottom,
        "& text": {
          fontFamily: "Puritan, san-serif",
          fontSize: "13px"
        }
      },
      math: {
        fontSize: "12px"
      },
      dot: {
        stroke: "white",
        strokeWidth: 3,
        fill: colors.pink["500"],
        cursor: "pointer"
      },
      xssd: {
        fill: "none",
        strokeWidth: 2,
        stroke: colors.blue.A400
      },
      xcl: {
        fill: "none",
        strokeWidth: 2,
        stroke: colors.deepOrange.A400
      },
      hidden: {
        fill: "white",
        opacity: 0
      }
    }),