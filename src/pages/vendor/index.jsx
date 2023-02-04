import {
  MoreHorizOutlined,
  ToggleOffOutlined,
  ToggleOnOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyCell from "components/EmptyTable";
import BasicMenu from "components/MenuComponent";
import BasicTable from "components/Table";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetMainVendorsQuery,
  useToggleVendorMutation,
} from "redux/api/admin";
import { getDate } from "utilis";

const Vendors = () => {
  const { data: vendors } = useGetMainVendorsQuery();

  const headcells = ["Name", "Phone", "Vendor Name", "Date Joined", "Status"];
  return (
    <Grid item container flexDirection="column">
      <Card sx={{ width: "100%" }}>
        {vendors?.length > 0 ? (
          <Grid
            item
            container
            direction="column"
            overflow="hidden"
            sx={{ mt: 2 }}
            maxWidth={{ md: "100%", sm: "100%", xs: "100%" }}
          >
            <BasicTable
              tableHead={headcells}
              rows={vendors}
              paginationLabel="vendors per page"
              hasCheckbox={false}
              per_page={vendors?.per_page}
              totalPage={vendors?.to}
              nextPageUrl={vendors?.next_page_url}
            >
              {vendors?.map((row) => (
                <Rows key={row.id} row={row} />
              ))}
            </BasicTable>
          </Grid>
        ) : (
          <EmptyCell
            paginationLabel="Availability  per page"
            headCells={headcells}
          />
        )}
      </Card>
    </Grid>
  );
};

function Rows({ row }) {
  const {
    id,
    phone,
    profile_picture,
    name,
    vendor_name,
    first_name,
    last_name,
    is_closed,
    created_at,
  } = row;
  const [toggleVendor, { isLoading: deleting }] = useToggleVendorMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = async () => {
    const { error, data } = await toggleVendor({ vendor_id: id });
    if (data) {
      toast.success(data?.message);
      setTimeout(() => handleClose(), 1000);
    }
    if (error) toast.error(error);
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      <TableCell scope="row" align="left">
        <Grid item container alignItems="center" gap={1} flexWrap="nowrap">
          <Avatar src={profile_picture}>
            {first_name?.slice(0, 1).toUpperCase()}
          </Avatar>
          <Grid item container alignItems="center" gap={1} flexWrap="nowrap">
            <Typography>{`${first_name} ${last_name}`}</Typography>
            {Boolean(is_closed) && <VerifiedOutlined sx={{ color: "green" }} />}
          </Grid>
        </Grid>
        {name}
      </TableCell>
      <TableCell align="left">{phone}</TableCell>
      <TableCell align="left">{vendor_name || "No Vendor Name"}</TableCell>
      <TableCell align="left">{getDate(created_at)}</TableCell>
      <TableCell align="left">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizOutlined />
        </IconButton>

        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        >
          <MenuItem onClick={handleToggle}>
            <ListItemIcon>
              {is_closed ? (
                <ToggleOnOutlined fontSize="large" sx={{ color: "green" }} />
              ) : (
                <ToggleOffOutlined fontSize="large" sx={{ color: "red" }} />
              )}
            </ListItemIcon>

            <ListItemText>
              {deleting ? "loading" : is_closed ? "Active" : "InActive"}
            </ListItemText>
          </MenuItem>
        </BasicMenu>
      </TableCell>
    </TableRow>
  );
}

export default Vendors;
