import { MoreHorizOutlined } from "@mui/icons-material";
import {
  Grid,
  Card,
  TableRow,
  TableCell,
  Skeleton,
  IconButton,
} from "@mui/material";
import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import React from "react";
import {
  useDeleteAvendorMutation,
  useGetAllVendorsQuery,
} from "redux/api/admin";
import { getTimeMoment } from "utilis";

const Vendor = () => {
  const { data: vendors, isLoading: loading } = useGetAllVendorsQuery();
  const [deleteVendor, { isLoading }] = useDeleteAvendorMutation();

  if (loading) return <Skeleton />;
  const headcells = ["Name", "Link", "Created At", "Delete"];
  return (
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
            {vendors?.data?.map((row, index) => {
              const { id, name, url, created_at } = row;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={id}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell scope="row" align="left">
                    {name}
                  </TableCell>
                  <TableCell align="left">
                    <a href={url}>{url}</a>
                  </TableCell>
                  <TableCell align="left">
                    {getTimeMoment(created_at)}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <MoreHorizOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </BasicTable>
        </Grid>
      ) : (
        <EmptyCell
          paginationLabel="Availability  per page"
          headCells={headcells}
        />
      )}
    </Card>
  );
};

export default Vendor;
