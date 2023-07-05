import { VerifiedOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  Grid,
  Skeleton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { Formik, Form } from "formik/dist";

import { useNavigate } from "react-router-dom";
import { useGetMainVendorsQuery } from "redux/api/admin";
import { getDate } from "utilis";
import FormikControl from "validation/FormikControl";

const AllMessages = () => {
  const { data: vendors, isLoading, isFetching } = useGetMainVendorsQuery();

  const headcells = [
    "Name",
    "Store Name",
    "Date Joined",
    "No of Messages",
    "No of Responses",
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
  const navigate = useNavigate();

  return (
    <TableRow
      tabIndex={-1}
      sx={{ cursor: "pointer" }}
      hover
      onClick={() => navigate(`${id}`)}
    >
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
      <TableCell align="left">{getDate(created_at)}</TableCell>
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
export default AllMessages;
