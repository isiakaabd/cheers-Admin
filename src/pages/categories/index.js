import { Card, Grid, Skeleton, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "redux/api/admin";
import Create from "./component";

const Categories = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeleton />;
  return (
    <>
      <Grid item container flexDirection="column" gap={2}>
        <Grid item sx={{ ml: "auto", mb: 3 }}>
          <CustomButton
            title="Add Category"
            type="button"
            onClick={() => setOpen(true)}
          />
        </Grid>
        <Grid item container justifyContent="space-between" gap={4}>
          {categories?.map((item) => {
            const { id, title, description } = item;
            return (
              <Grid item md={3.5} xs={6} key={id} sx={{ boxShadow: 0 }}>
                <Card
                  component={Link}
                  variant="outlined"
                  to={`/categories/${id}`}
                  sx={{
                    boxShadow: 2,
                    textDecoration: "none",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "15rem",
                    gap: 3,
                  }}
                >
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: "#e4e6ef" }}>
                    {description || "No Description"}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Dialogs
        isOpen={open}
        handleClose={(e) => {
          setOpen(false);
        }}
      >
        <Create setOpen={setOpen} type="add" heading={"Add Category"} />
      </Dialogs>
    </>
  );
};

export default Categories;
