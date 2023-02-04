import {
  DeleteForeverOutlined,
  DeleteOutline,
  Edit,
  MoreHorizOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
import BasicMenu from "components/MenuComponent";
import { Form, Formik } from "formik/dist";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "redux/api/admin";
import { getDate } from "utilis";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
import Create from "./component";

const SingleCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: category, isLoading } = useGetCategoryQuery(id);
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [opens, setOpens] = useState(false);
  if (isLoading) return <Skeleton />;
  const { title, createdAt, description } = category;
  const handleDelete = async (e) => {
    const { data, error } = await deleteCategory({
      categoryId: id,
      name: title,
    });
    if (data) {
      toast.success("Category deleted successfully");
      handleClose(e);
      setTimeout(() => navigate("/categories"), 3000);
    }
    if (error) toast.error(error);
  };

  return (
    <>
      <Grid item container>
        <Card
          sx={{
            width: "100%",
            p: 4,
            flexDirection: "column",
            gap: 4,
            display: "flex",
          }}
        >
          <Grid item container alignItems="center">
            <Typography
              flex={1}
              fontSize={{ md: "2rem", xs: "1.5rem" }}
              color="text.primary"
              fontWeight={700}
            >
              {title}
            </Typography>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVertOutlined />
            </IconButton>
            <BasicMenu
              open={open}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <MenuItem
                onClick={(e) => {
                  handleClose(e);
                  setOpens(true);
                }}
              >
                <ListItemIcon>
                  <Edit fontSize="large" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
                <ListItemIcon>
                  <DeleteOutline fontSize="large" sx={{ color: "red" }} />
                </ListItemIcon>

                <ListItemText>{!deleting ? "Delete" : "Deleting"}</ListItemText>
              </MenuItem>
            </BasicMenu>
          </Grid>
          <Grid item container gap={2}>
            <Typography color="text.primary" fontWeight={700}>
              Created On:
            </Typography>
            <Typography color="text.primary">{getDate(createdAt)}</Typography>
          </Grid>
          <Grid item container gap={2}>
            <Typography color="text.primary" fontWeight={700}>
              Description:
            </Typography>
            <Typography color="text.primary">
              {description || "No Description"}
            </Typography>
          </Grid>
        </Card>
      </Grid>

      <Dialogs
        isOpen={opens}
        handleClose={(e) => {
          handleClose(e);
          setOpens(false);
        }}
      >
        <Create
          title={title}
          open={opens}
          id={id}
          setOpen={setOpens}
          description={description}
          type="edit"
          heading={"Edit Category"}
        />
      </Dialogs>
    </>
  );
};

export default SingleCategory;
