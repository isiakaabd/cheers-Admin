import {
  BiotechOutlined,
  BlockRounded,
  DeleteOutline,
  MoreHorizOutlined,
  ResetTvRounded,
  ToggleOffOutlined,
  ToggleOnOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Checkbox,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import EmptyCell from "components/EmptyTable";
import BasicMenu from "components/MenuComponent";
import BasicTable from "components/Table";
import { Formik, Form } from "formik/dist";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetMainVendorsQuery,
  useToggleVendorMutation,
} from "redux/api/admin";
import { getDate } from "utilis";
import FormikControl from "validation/FormikControl";

const LocalOrders = () => {
  const { data: vendors, isLoading, isFetching } = useGetMainVendorsQuery();

  const headcells = [
    "Name",
    "Phone",
    "Item Name",
    "Order No",
    "Price",
    "Status",
    "Settlement",
    "",
  ];
  if (isLoading) return <Skeletons />;
  const onSubmit = () => {};
  return (
    <Grid item container flexDirection="column">
      <Grid
        item
        container
        alignItems="center"
        gap={{ md: 8, xs: 2 }}
        sx={{ my: 3 }}
        flexWrap={"nowrap"}
      >
        <Grid item flex={1}>
          <Formik initialValues={{ search: "" }} onSubmit={onSubmit}>
            <Form noValidate style={{ width: "100%" }}>
              <Grid item container gap={2}>
                <Grid item flex={1}>
                  <FormikControl
                    name="search"
                    placeholder="Search Order by Id"
                  />
                </Grid>
                <Grid item>
                  <CustomButton
                    title="Search"
                    type="submit"
                    disabled={isFetching}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
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
              paginationLabel="Orders per page"
              hasCheckbox
              per_page={vendors?.per_page}
              totalPage={vendors?.to}
              nextPageUrl={vendors?.next_page_url}
            >
              {vendors?.map((row) => (
                <Rows key={row.id} row={row} hasCheckbox={true} />
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

function Rows({ row, hasCheckbox }) {
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
  const handleDelete = async () => {
    setTimeout(() => handleClose(), 1000);
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      {hasCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            size="large"
            color="primary"
            onClick={(event) => {
              event.stopPropagation();
              //   handleClicks(event, id);
            }}
            // checked={isItemSelected}
          />
        </TableCell>
      )}

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
      <TableCell align="left">{vendor_name || "No Store Name"}</TableCell>
      <TableCell align="left">{getDate(created_at)}</TableCell>
      <TableCell align="left">{getDate(vendor_name)}</TableCell>
      <TableCell align="left">{getDate(vendor_name)}</TableCell>
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
          <MenuItem>
            <ListItemIcon>
              <ResetTvRounded fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"Reset Password"}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutline fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"Delete User"}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <BlockRounded fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"Block User"}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <BiotechOutlined fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"CHange User's Birthday"}</ListItemText>
          </MenuItem>
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

function Skeletons() {
  return (
    <Grid item container gap={4}>
      <Skeleton
        sx={{ height: "50vh", width: "100%" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
}
export default LocalOrders;
