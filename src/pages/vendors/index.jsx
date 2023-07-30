import {
  DeleteOutline,
  ImportContactsOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import * as Yup from "yup";
import FormikControl from "validation/FormikControl";
import { PhotoProvider, PhotoView } from "react-photo-view";
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
  Typography,
  Avatar,
} from "@mui/material";
import Dialogs from "components/Dialog";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useEffect, useState } from "react";
import {
  useDeleteAvendorMutation,
  useLazyGetAllGlobalVendorsQuery,
  useUpdateGlobalVendorMutation,
} from "redux/api/admin";
import { getTimeMoment } from "utilis";
import CreateGlobalVendor from "./component";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";

const Vendor = () => {
  const [getVendors, { data: vendors, isLoading: loading, isFetching }] =
    useLazyGetAllGlobalVendorsQuery();

  useEffect(() => {
    getVendors({ search: "" });
    //eslint-disable-next-line
  }, []);
  const [open, setOpen] = useState(false);
  // if (loading) return <Skeletons />;

  const onSubmit = (values) => {
    getVendors({ search: values.search });
  };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const headcells = ["Name", "Link", "Created At", ""];
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

        {loading || isFetching ? (
          <Skeletons />
        ) : (
          <Card sx={{ width: "100%" }}>
            {vendors?.data?.length > 0 || vendors?.length ? (
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
                  rows={vendors.length > 0 ? vendors : vendors?.data}
                  paginationLabel="vendors per page"
                  hasCheckbox={false}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  setRowsPerPage={setRowsPerPage}
                  setPage={setPage}
                >
                  {vendors?.data
                    ? (rowsPerPage > 0
                        ? vendors?.data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : vendors?.data
                      ).map((row) => <Rows key={row.id} row={row} />)
                    : (rowsPerPage > 0
                        ? vendors.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : vendors
                      ).map((row) => <Rows key={row.id} row={row} />)}
                </BasicTable>
              </Grid>
            ) : (
              <EmptyCell
                paginationLabel="Availability  per page"
                headCells={headcells}
              />
            )}
          </Card>
        )}
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
  const { id, name, url, created_at, media } = row;
  const [deleteVendor, { isLoading: deleting, status }] =
    useDeleteAvendorMutation();
  const [updateVendor, { isLoading: updating }] =
    useUpdateGlobalVendorMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
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
  const handleUpdate = async (values) => {
    const { name, url, file } = values;
    const formData = new FormData();
    formData.append("_method", "post");
    formData.append("name", name);
    formData.append("url", url);
    if (file.file.length > 0) {
      formData.append(`logo`, file.file[0]);
    }

    const { error, data } = await updateVendor({
      id,
      body: formData,
    });
    if (data) {
      toast.success(data);
      // setTimeout(() => handleClose(), 1000);
    }
    if (error) toast.error(error.message);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    url: Yup.string("").url("Must be a correct URL").required("required"),
  });
  return (
    <>
      <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
        <TableCell scope="row" align="left">
          <Grid item container alignItems={"center"} gap={1}>
            <Avatar
              sx={{ height: "2rem", width: "2rem" }}
              src={media[0]?.original_url}
            >
              {name?.split("")[0]}
            </Avatar>
            {name}
          </Grid>
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
            <MenuItem
              onClick={() => {
                setOpenUpdate(true);
                handleClose();
              }}
            >
              <ListItemIcon>
                <ImportContactsOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText>{"Update"}</ListItemText>
            </MenuItem>
          </BasicMenu>
        </TableCell>
      </TableRow>
      <Dialogs isOpen={openUpdate} handleClose={() => setOpenUpdate(false)}>
        <Formik
          enableReinitialize
          initialValues={{ ...row, file: null }}
          onSubmit={handleUpdate}
          validationSchema={validationSchema}
        >
          {({ values, errors }) => (
            <Form>
              <Grid item container py={1} gap={3}>
                <Grid item container py={1}>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    Update Global Vendor
                  </Typography>
                </Grid>
                <Grid item container>
                  <FormikControl placeholder="Name" name="name" />
                </Grid>
                <Grid item container>
                  <FormikControl placeholder="URL" name="url" />
                </Grid>
                <Grid item container>
                  <FormikControl name="file" control="file" />
                </Grid>
                {errors.file && (
                  <Typography color="error" variant="error">
                    {errors.file}
                  </Typography>
                )}
                <PhotoProvider>
                  <Grid
                    item
                    container
                    display="grid"
                    gap={1}
                    gridTemplateColumns={{
                      xs: "repeat(auto-fill, minmax(5rem, 1fr))",
                    }}
                  >
                    {values?.file?.preview?.map((item, idx) => (
                      <Grid
                        key={idx}
                        item
                        sx={{
                          // p: 0.5,
                          position: "relative",
                          width: "100%",
                        }}
                      >
                        <PhotoView key={idx} src={item}>
                          <Avatar
                            variant="square"
                            src={item}
                            sx={{
                              cursor: "pointer",
                              "& .MuiAvatar-img": {
                                objectFit: "cover !important",
                                width: "100%",
                              },
                              width: "100%",
                              maxHeight: "100%",
                              transition: "border 1ms linear",
                            }}
                          />
                        </PhotoView>
                      </Grid>
                    ))}
                  </Grid>
                </PhotoProvider>
                <Grid item container mt={2}>
                  <CustomButton
                    type="submit"
                    title={"Update"}
                    isSubmitting={updating}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Dialogs>
    </>
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
