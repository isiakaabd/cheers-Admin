import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  Box,
  Checkbox,
  Toolbar,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  DeleteOutline,
  DeleteOutlineSharp,
  MoreVertOutlined,
  RestoreOutlined,
  StartOutlined,
} from "@mui/icons-material";
import BasicMenu from "./MenuComponent";
import Loader from "./Loader";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
export default function BasicTable({
  rows,
  tableHead,
  paginationLabel,
  children,
  selected,
  setSelected,
  hasCheckbox,
  per_page,
  totalPage,
  nextPageUrl,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(per_page);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await nextPageUrl;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, per_page));
    setPage(0);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.data?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <>
      <EnhancedTableToolbar
        numSelected={selected?.length}
        selected={selected}
        hasCheckbox={hasCheckbox}
      />
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              {hasCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    size="large"
                    onClick={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {tableHead.map((head, index) => (
                <TableCell key={index} align="left">
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[15, 30, 45, { label: "All", value: -1 }]}
                colSpan={3}
                count={totalPage}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": paginationLabel,
                  },
                  // native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, isLoading, hasCheckbox } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleDelete = async (action) => {};
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {hasCheckbox ? (
        numSelected > 0 ? (
          <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="h4">
            {`${numSelected} ${
              numSelected > 1 ? "Inventories" : "Inventory"
            } selected`}
          </Typography>
        ) : (
          <Typography sx={{ flex: "1 1 100%" }} variant="h4" id="tableTitle">
            {numSelected > 1 ? "Inventories" : "Inventory"}
          </Typography>
        )
      ) : null}
      {}

      {numSelected > 0 && (
        // <Tooltip
        //   title={`Delete ${numSelected > 1 ? "Inventories" : "Inventory"}`}
        // >
        <>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertOutlined sx={{ fontSize: "3rem" }} />
          </IconButton>
          <BasicMenu
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
          >
            {isLoading && <Loader color="#a80a69" />}
            <MenuItem
              onClick={() => handleDelete("DELETE_INVENTORY")}
              disabled={isLoading}
              sx={{ color: "red" }}
            >
              <ListItemIcon>
                <DeleteOutline fontSize="large" sx={{ color: "red" }} />
              </ListItemIcon>

              <ListItemText> Delete All</ListItemText>
            </MenuItem>
            <MenuItem
              disabled={isLoading}
              onClick={() => handleDelete("ZERO_STOCK")}
            >
              <ListItemIcon>
                <RestoreOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Stock to Zero" />
            </MenuItem>
            <MenuItem
              disabled={isLoading}
              onClick={() => handleDelete("ACTIVATE_INVENTORY")}
            >
              <ListItemIcon>
                <StartOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Activate All" />
            </MenuItem>
            <MenuItem
              disabled={isLoading}
              onClick={() => handleDelete("DEACTIVATE_INVENTORY")}
            >
              <ListItemIcon>
                <DeleteOutlineSharp fontSize="large" />
              </ListItemIcon>

              <ListItemText primary="Deactivate All" />
            </MenuItem>
          </BasicMenu>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
EnhancedTableToolbar.defaultProps = {
  hasCheckbox: false,
};
