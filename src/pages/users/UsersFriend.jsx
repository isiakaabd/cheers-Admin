import { Grid, Card, TableRow, TableCell, Skeleton } from "@mui/material";

import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useParams } from "react-router-dom";
import { useGetAllUserFriendsQuery } from "redux/api/admin";
import { formatedDate, getTimeMoment } from "utilis";

const UsersFriend = () => {
  const { id } = useParams();

  const { data: friends, isLoading: loading } = useGetAllUserFriendsQuery({
    user_id: id,
  });

  if (loading) return <Skeletons />;

  const headcells = [
    "Name",
    "UserName",
    "Birthday",
    "Email",
    "Phone",
    "Date Joined",
    "Address",
  ];
  return (
    <>
      <Grid item container flexDirection="column">
        <Card sx={{ width: "100%" }}>
          {friends?.length > 0 ? (
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
                rows={friends}
                paginationLabel="friends per page"
                hasCheckbox={false}
                per_page={friends?.per_page}
                totalPage={friends?.length}
                nextPageUrl={friends?.next_page_url}
              >
                {friends?.map((row) => (
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
    </>
  );
};

function Rows({ row }) {
  const {
    first_name,
    last_name,
    username,
    email,
    phone,
    created_at,
    date_of_birth,
    address,
  } = row;

  const overflow = {
    maxWidth: "20rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>
      <TableRow tabIndex={-1} hover>
        <TableCell
          scope="row"
          align="left"
          sx={overflow}
          title={`${first_name} ${last_name}`}
        >
          {first_name} {last_name}
        </TableCell>
        <TableCell align="left">{username}</TableCell>
        <TableCell align="left">{formatedDate(date_of_birth)}</TableCell>
        <TableCell align="left" sx={overflow} title={email}>
          {email}
        </TableCell>
        <TableCell align="left" sx={overflow}>
          {phone}
        </TableCell>
        <TableCell align="left">{getTimeMoment(created_at)}</TableCell>
        <TableCell align="left">{`${address.street}, ${address.state}`}</TableCell>
      </TableRow>
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

export default UsersFriend;
