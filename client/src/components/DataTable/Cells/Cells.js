import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { MakeArrayIntoCells } from "../../MakeArrayIntoCells";
import { MakeStringIntoCell } from "../MakeStringIntoCell";

const CellContent = ({ type, doc, col }) => {
  return (
    <div>
      {type === "Boolean" && <Done />}
      {type === "string" && <MakeStringIntoCell col={col} string={doc[col]} />}
      {type === "object" &&
        (Array.isArray(doc[col]) ? (
          <MakeArrayIntoCells usesPaper array={doc[col]} />
        ) : (
          "Error"
        ))}
    </div>
  );
};

CellContent.propTypes = {
  type: PropTypes.string,
  doc: PropTypes.object,
  col: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  innerDiv: {
    height: theme.spacing(8),
    overflow: "auto",
  },
  cell: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

const Cells = ({ doc, cols }) => {
  const classes = useStyles();
  return cols.map((col) => {
    let cellType = typeof doc[col];
    return (
      <TableCell className={classes.cell} key={doc._id.concat(`_${col}`)}>
        <CellContent type={cellType} doc={doc} col={col} />
      </TableCell>
    );
  });
};

Cells.propTypes = {
  doc: PropTypes.object,
  cols: PropTypes.array,
};

export { Cells };
