import {
  Card,
  Checkbox,
  Chip,
  Grid,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import { useGetLocalOrdersQuery } from "redux/api/admin";

const LocalOrders = () => {
  const { data: orders, isLoading } = useGetLocalOrdersQuery();

  const headcells = [
    "Name",
    "Vendor",
    "Item Name",
    "Order No",
    "Price",
    "Status",
    "Settlement",
  ];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  if (isLoading) return <Skeletons />;

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
        {/* <Grid item flex={1}>
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
        </Grid> */}
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
              paginationLabel="Orders per page"
              hasCheckbox={false}
              rowsPerPage={rowsPerPage}
              page={page}
              setRowsPerPage={setRowsPerPage}
              setPage={setPage}
            >
              {(rowsPerPage > 0
                ? orders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : orders
              ).map((row) => (
                <Rows key={row.id} row={row} hasCheckbox={false} />
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
  const { status, vendor, order_id, price, vendor_name, user, settlement } =
    row;
  const overflow = {
    maxWidth: "20rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      <TableCell scope="row" align="left">
        <Grid item container alignItems="center" gap={1} flexWrap="nowrap">
          <Typography
            sx={overflow}
          >{`${user?.first_name} ${user.last_name}`}</Typography>
        </Grid>
      </TableCell>
      <TableCell align="left" sx={overflow}>
        <Typography
          sx={overflow}
        >{`${vendor?.first_name} ${vendor.last_name}`}</Typography>
      </TableCell>
      <TableCell align="left" sx={overflow}>
        {vendor_name || "No Store Name"}
      </TableCell>
      <TableCell align="left" sx={overflow}>
        <Typography sx={overflow}>{order_id}</Typography>
      </TableCell>
      <TableCell align="left">{price ? price : "NA"}</TableCell>
      <TableCell align="left">
        <Chip
          label={status}
          sx={{ fontSize: "1.4rem" }}
          color={status === "success" ? "main" : "secondary"}
        />
      </TableCell>
      <TableCell align="left">{settlement ? settlement : "NA"}</TableCell>
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
