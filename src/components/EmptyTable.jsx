import React from "react";

import {
  Box,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";

import NoData from "./NoData";
import EnhancedTableHead from "./EnhancedTableHeader";

const EmptyCell = (props) => {
  const { headCells } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={0}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead rowCount={10} headCells={headCells} />
            <TableBody>
              <TableRow
                style={{
                  height: 53 * 5,
                  width: "100%",
                }}
              >
                <TableCell colSpan={10}>
                  <Grid container justifyContent="center">
                    <NoData />
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

EmptyCell.propTypes = {
  headCells: PropTypes.array,
  paginationLabel: PropTypes.string,
  title: PropTypes.string,
};

export default EmptyCell;
