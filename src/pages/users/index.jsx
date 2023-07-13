import {
  BiotechOutlined,
  BlockRounded,
  DeleteOutline,
  MoreHorizOutlined,
  ResetTvRounded,
} from "@mui/icons-material";
import dayjs from "dayjs";
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
} from "@mui/material";

import EmptyCell from "components/EmptyTable";
import BasicTable from "components/Table";
import { useCallback, useState } from "react";
import {
  useBlockUserMutation,
  useChangeBirthdayMutation,
  useDeleteUserAccountMutation,
  useGetAllUsersQuery,
} from "redux/api/admin";
import { formatedDate, getTimeMoment } from "utilis";

import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";
import Dialogs from "components/Dialog";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import CustomButton from "components/CustomButton";

const Users = () => {
  const { data: users, isLoading: loading } = useGetAllUsersQuery();

  if (loading) return <Skeletons />;
  console.log(users);
  const headcells = [
    "Name",
    "UserName",
    "Birthday",
    "Email",
    "Phone",
    "Date Joined",
    "",
  ];
  return (
    <>
      <Grid item container flexDirection="column">
        <Card sx={{ width: "100%" }}>
          {users?.length > 0 ? (
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
                rows={users}
                paginationLabel="users per page"
                hasCheckbox={false}
                per_page={users?.per_page}
                totalPage={users?.length}
                nextPageUrl={users?.next_page_url}
              >
                {users?.map((row) => (
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
    // birthday,
    // friends_no,
    email,
    phone,
    created_at,
    date_of_birth,
    id,
  } = row;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteUser, { isLoading: deletingUser }] =
    useDeleteUserAccountMutation();
  const [blockUser, { isLoading: blockingUser }] = useBlockUserMutation();
  const [changeBirthday, { isLoading: changingBirthday }] =
    useChangeBirthdayMutation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMultipleAction = async (action) => {
    try {
      const data = await action({ user_id: id });

      toast.success(data?.data);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);

  const handleOpenModal = () => {
    setIsOpen(true);
    handleClose();
  };
  const changeDateFormat = useCallback((date) => {
    let originalDateString = date;

    // Step 1: Split the original date string and extract day, month, and year
    let dateParts = originalDateString.split("/");
    let day = dateParts[0];
    let month = dateParts[1];
    let year = dateParts[2];

    // Step 2: Create a new date string in the desired format
    let formattedDateString = year + "-" + month + "-" + day;

    return formattedDateString;
  }, []);
  const handleChangeBirthDay = async (values) => {
    const { data, error } = await changeBirthday({
      date_of_birth: values.dob,
      user_id: id,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
    setTimeout(() => handleCloseModal(), 300);
  };
  return (
    <>
      <TableRow tabIndex={-1} sx={{ cursor: "pointer" }}>
        <TableCell scope="row" align="left">
          {first_name} {last_name}
        </TableCell>
        <TableCell align="left">{username}</TableCell>
        <TableCell align="left">{formatedDate(date_of_birth)}</TableCell>
        {/* <TableCell align="left">{friends_no}</TableCell> */}
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{phone}</TableCell>
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
            <MenuItem>
              <ListItemIcon>
                <ResetTvRounded fontSize="large" />
              </ListItemIcon>

              <ListItemText>{"Reset Password"}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleMultipleAction(deleteUser)}>
              <ListItemIcon>
                <DeleteOutline fontSize="large" />
              </ListItemIcon>

              <ListItemText>
                {deletingUser ? "Deleting" : "Delete User"}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleMultipleAction(blockUser)}>
              <ListItemIcon>
                <BlockRounded fontSize="large" />
              </ListItemIcon>

              <ListItemText>
                {blockingUser ? "Blocking" : "Block User"}
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleOpenModal}>
              <ListItemIcon>
                <BiotechOutlined fontSize="large" />
              </ListItemIcon>

              <ListItemText>{"Change User's Birthday"}</ListItemText>
            </MenuItem>
          </BasicMenu>
        </TableCell>
      </TableRow>
      <Dialogs isOpen={isOpen} handleClose={handleCloseModal}>
        <Formik
          initialValues={{ dob: dayjs(changeDateFormat(date_of_birth)) }}
          onSubmit={handleChangeBirthDay}
        >
          <Form>
            <Grid item container py={1}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Change User Birthday
              </Typography>
            </Grid>
            <Grid item container>
              <FormikControl control={"date"} label="DOB" name="dob" />
            </Grid>
            <Grid item mt={2}>
              <CustomButton
                type="submit"
                title={"Change"}
                isSubmitting={changingBirthday}
              />
            </Grid>
          </Form>
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

export default Users;
