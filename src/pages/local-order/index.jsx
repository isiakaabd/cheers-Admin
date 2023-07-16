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
import { useGetLocalOrdersQuery } from "redux/api/admin";

const LocalOrders = () => {
  const { data: orders, isLoading } = useGetLocalOrdersQuery();

  const headcells = [
    "Name",
    "Phone",
    "Item Name",
    "Order No",
    "Price",
    "Status",
    "Settlement",
  ];
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
              hasCheckbox
              per_page={orders?.per_page}
              totalPage={orders?.to}
              nextPageUrl={orders?.next_page_url}
            >
              {orders?.map((row) => (
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
  const { status, name, order_id, price, vendor_name, user, settlement } = row;

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
          <Typography>{`${user?.first_name} ${user.last_name}`}</Typography>
        </Grid>
        {name}
      </TableCell>
      <TableCell align="left">{user?.phone}</TableCell>
      <TableCell align="left">{vendor_name || "No Store Name"}</TableCell>
      <TableCell align="left">{order_id}</TableCell>
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
