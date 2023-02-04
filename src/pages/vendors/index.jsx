import { DeleteOutline, MoreHorizOutlined } from "@mui/icons-material";
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
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import {
  useCreateVendorMutation,
  useDeleteAvendorMutation,
  useGetAllVendorsQuery,
} from "redux/api/admin";
import { getTimeMoment } from "utilis";
import CreateGlobalVendor from "./component";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";

const Vendor = () => {
  const { data: vendors, isLoading: loading } = useGetAllVendorsQuery();

  const [open, setOpen] = useState(false);

  if (loading) return <Skeleton />;
  const headcells = ["Name", "Link", "Created At", "Delete"];
  return (
    <>
      <Grid item container flexDirection="column">
        <Grid item sx={{ ml: "auto", mb: 3 }}>
          <CustomButton
            title="Add Global Vendor"
            type="button"
            onClick={() => setOpen(true)}
          />
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
        <a href={url}>{url}</a>
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

export default Vendor;
