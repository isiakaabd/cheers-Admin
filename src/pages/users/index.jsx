import {
  BiotechOutlined,
  BlockRounded,
  DeleteOutline,
  MoreHorizOutlined,
  ResetTvRounded,
} from "@mui/icons-material";
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

import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useState } from "react";
import { useGetAllVendorsQuery } from "redux/api/admin";
import { getTimeMoment } from "utilis";

import BasicMenu from "components/MenuComponent";

const Users = () => {
  const { data: vendors, isLoading: loading } = useGetAllVendorsQuery();

  if (loading) return <Skeletons />;
  const headcells = [
    "Name",
    "UserName",
    "Birthday",
    "Friends' No",
    "Email",
    "Phone",
    "Date Joined",
    "",
  ];
  return (
    <>
      <Grid item container flexDirection="column">
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
                totalPage={vendors?.length}
                nextPageUrl={vendors?.next_page_url}
              >
                {[
                  {
                    name: "Sule Muntari",
                    username: "Sule Muntari",
                    birthday: Date.now(),
                    friends_no: 3,
                    email: "sule-muntari@gmail.com",
                    phone: "0812323445534",
                    date: Date.now(),
                    id: Date.now(),
                  },
                ].map((row) => (
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
  const { name, username, birthday, friends_no, email, phone, date } = row;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    setTimeout(() => handleClose(), 1000);
  };
  return (
    <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
      <TableCell scope="row" align="left">
        {name}
      </TableCell>
      <TableCell align="left">{username}</TableCell>
      <TableCell align="left">{getTimeMoment(birthday)}</TableCell>
      <TableCell align="left">{friends_no}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{phone}</TableCell>
      <TableCell align="left">{date}</TableCell>
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

export default Users;
