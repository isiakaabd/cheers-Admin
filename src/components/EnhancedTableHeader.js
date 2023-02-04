import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell } from "@mui/material";

function EnhancedTableHead(props) {
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === headCells.length - 1;
          const firstBorder = { borderRadius: "8px 0px 0px 8px" };
          const lastBorder = { borderRadius: "0px 8px 8px 0px" };
          return (
            <TableCell
              key={idx}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sx={isFirst ? firstBorder : isLast && lastBorder}
            >
              {headCell}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
  rowCount: PropTypes.number,
  headCells: PropTypes.array,
  hasCheckbox: PropTypes.bool,
};

export default EnhancedTableHead;
