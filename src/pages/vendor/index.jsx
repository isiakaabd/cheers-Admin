import {
  // BiotechOutlined,
  // BlockRounded,
  // DeleteOutline,
  MoreHorizOutlined,
  // ResetTvRounded,
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useLazyGetMainVendorsQuery,
  useLazySearchVendorQuery,
  useToggleVendorMutation,
} from "redux/api/admin";
import { getDate } from "utilis";
import FormikControl from "validation/FormikControl";

const Vendors = () => {
  const [state, setState] = useState([]);
  const [getAllVendors, { data: vendors, isLoading }] =
    useLazyGetMainVendorsQuery();
  const [searchVendor, { isLoading: loading }] = useLazySearchVendorQuery();

  useEffect(() => {
    getAllVendors();
    if (vendors) {
      setState(vendors);
    }
    //eslint-disable-next-line
  }, [vendors]);
  const headcells = [
    "Name",
    "Phone",
    "Store Name",
    "Address",
    "Email",
    "Date Joined",
    "Status",
    "",
  ];
  if (isLoading) return <Skeletons />;
  const onSubmit = async (values) => {
    if (!values.search) {
      setState(vendors);
    } else {
      const { data } = await searchVendor({ search: values.search });
      if (data) {
        setState(data);
      }
    }
  };
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
                    placeholder="Search Vendor by Name"
                  />
                </Grid>
                <Grid item>
                  <CustomButton
                    title="Search"
                    type="submit"
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Grid>
      {!loading ? (
        <Card sx={{ width: "100%" }}>
          {state.length > 0 ? (
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
                rows={state}
                paginationLabel="vendors per page"
                hasCheckbox={false}
                per_page={vendors?.per_page}
                totalPage={vendors?.to}
                nextPageUrl={vendors?.next_page_url}
              >
                {state?.map((row) => (
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
      ) : (
        <Skeletons />
      )}
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
    is_active,
    email,
    address,
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
  // const handleMultipleAction = async (action) => {
  //   try {
  //     const data = await action({ user_id: id });

  //     toast.success(data?.data);
  //   } catch (e) {
  //     toast.error(e.message);
  //   }
  // };
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
      <TableCell align="left">{vendor_name || "NA"}</TableCell>
      <TableCell align="left">{address ? address : "NA"}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{getDate(created_at)}</TableCell>
      <TableCell align="left">
        {Boolean(is_active) ? "Active" : "Inactive"}
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

        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        >
          {/* <MenuItem onClick={() => handleMultipleAction(deleteUser)}>
            <ListItemIcon>
              <ResetTvRounded fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"Reset Password"}</ListItemText>
          </MenuItem> */}
          {/* <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutline fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"Delete User"}</ListItemText>
          </MenuItem> */}

          {/* <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <BiotechOutlined fontSize="large" />
            </ListItemIcon>

            <ListItemText>{"CHange User's Birthday"}</ListItemText>
          </MenuItem> */}
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
export default Vendors;
