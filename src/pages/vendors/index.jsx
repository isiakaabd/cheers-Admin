import { DeleteOutline, MoreHorizOutlined } from "@mui/icons-material";
import FormikControl from "validation/FormikControl";

import { Formik, Form } from "formik/dist";
import CustomButton from "components/CustomButton";
import {
  Grid,
  Card,
  TableRow,
  TableCell,
  Skeleton,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Dialogs from "components/Dialog";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import {
  useDeleteAvendorMutation,
  useGetAllVendorsQuery,
} from "redux/api/admin";
import { getTimeMoment } from "utilis";
import CreateGlobalVendor from "./component";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";

const Vendor = () => {
  const {
    data: vendors,
    isLoading: loading,
    isFetching,
  } = useGetAllVendorsQuery();

  const [open, setOpen] = useState(false);
  if (loading) return <Skeletons />;
  const onSubmit = () => {};
  const headcells = ["Name", "Link", "Created At", "Delete"];
  return (
    <>
      <Grid item container flexDirection="column">
        {/* <Grid item sx={{ ml: "auto", mb: 3 }}> */}
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
                      disabled={isFetching}
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          <Grid item>
            <CustomButton
              title="Add Global Vendor"
              type="button"
              onClick={() => setOpen(true)}
            />
          </Grid>
        </Grid>

        <Card sx={{ width: "100%" }}>
          {vendors?.data?.length > 0 ? (
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
                {vendors?.data?.map((row) => (
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

      <Dialogs
        isOpen={open}
        handleClose={(e) => {
          setOpen(false);
        }}
      >
        <CreateGlobalVendor
          open={open}
          setOpen={setOpen}
          type="create"
          heading={"Add Global Vendor"}
        />
      </Dialogs>
    </>
  );
};

function Rows({ row }) {
  const { id, name, url, created_at } = row;
  const [deleteVendor, { isLoading: deleting, status }] =
    useDeleteAvendorMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    const { error } = await deleteVendor(id);
    if (status === "fulfilled") {
      toast.success("Vendor deleted successfully");
      setTimeout(() => handleClose(), 1000);
    }
    if (error) toast.error(error);
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      <TableCell scope="row" align="left">
        {name}
      </TableCell>
      <TableCell align="left">
        <a href={url} rel="noreferrer" target="_blank">
          {url}
        </a>
      </TableCell>
      <TableCell align="left">{getTimeMoment(created_at)}</TableCell>
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
          <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
            <ListItemIcon>
              <DeleteOutline fontSize="large" sx={{ color: "red" }} />
            </ListItemIcon>

            <ListItemText>{!deleting ? "Delete" : "Deleting"}</ListItemText>
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
        sx={{ height: "5rem", marginLeft: "auto", width: "15rem" }}
        animation="wave"
        variant="rectangular"
      />
      <Skeleton
        sx={{ height: "50vh", width: "100%" }}
        animation="wave"
        variant="rectangular"
      />
    </Grid>
  );
}

export default Vendor;
