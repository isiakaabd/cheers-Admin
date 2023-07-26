import { MoreHorizOutlined, VerifiedOutlined } from "@mui/icons-material";
import {
  Card,
  Chip,
  Grid,
  IconButton,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import EmptyCell from "components/EmptyTable";
// import BasicMenu from "components/MenuComponent";
import BasicTable from "components/Table";
import { Formik, Form } from "formik/dist";
import { useState } from "react";
// import { toast } from "react-toastify";
import {
  useGetGlobalOrdersQuery,
  // useToggleVendorMutation,
} from "redux/api/admin";
import FormikControl from "validation/FormikControl";

const Orders = () => {
  const { data: orders, isLoading, isFetching } = useGetGlobalOrdersQuery();

  const headcells = [
    "Name",
    // "Phone",
    // "Email",
    " Address",
    // "Email",
    "Item Name",
    "URL",
    "Price",
    "Status",
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
        {orders?.length > 0 ? (
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
              rows={orders}
              paginationLabel="vendors per page"
              hasCheckbox={false}
              per_page={orders?.per_page}
              totalPage={orders?.to}
              nextPageUrl={orders?.next_page_url}
            >
              {orders?.map((row) => (
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
  const { wishlist, url, user, is_closed, status } = row;
  // const [toggleVendor, { isLoading: deleting }] = useToggleVendorMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleToggle = async () => {
  //   const { error, data } = await toggleVendor({ vendor_id: id });
  //   if (data) {
  //     toast.success(data?.message);
  //     setTimeout(() => handleClose(), 1000);
  //   }
  //   if (error) toast.error(error);
  // };
  // const handleDelete = async () => {
  //   setTimeout(() => handleClose(), 1000);
  // };
  const overflow = {
    maxWidth: "25rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      <TableCell scope="row" align="left">
        <Grid item container alignItems="center" gap={1} flexWrap="nowrap">
          <Grid item container alignItems="center" gap={1} flexWrap="nowrap">
            <Typography>{`${user?.first_name} ${user?.last_name}`}</Typography>
            {Boolean(is_closed) && <VerifiedOutlined sx={{ color: "green" }} />}
          </Grid>
        </Grid>
      </TableCell>
      {/* <TableCell align="left">{phone}</TableCell> */}
      <TableCell align="left">
        <Typography sx={overflow}>
          {user?.address?.street
            ? `${user?.address?.street} ${user?.address?.street}`
            : "NA"}
        </Typography>
      </TableCell>
      <TableCell align="left">
        {wishlist?.product?.name ? wishlist?.product?.name : "NA"}
      </TableCell>
      {/* <TableCell align="left">{getDate(created_at)}</TableCell> */}
      {/* <TableCell align="left">{getDate(created_at)}</TableCell> */}
      <TableCell align="left">
        {url ? (
          <a href={url} rel="noreferrer" target="_blank">
            Link
          </a>
        ) : (
          "NA"
        )}
      </TableCell>
      <TableCell align="left">
        {wishlist?.product?.price ? wishlist?.product?.price : "NA"}
      </TableCell>
      <TableCell align="left">
        <Chip
          label={status}
          color={status === "pending" ? "warning" : "success"}
        />
      </TableCell>
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

        {/* <BasicMenu
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
        </BasicMenu> */}
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
export default Orders;
