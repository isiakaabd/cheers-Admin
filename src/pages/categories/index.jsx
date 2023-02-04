import { Card, Grid, Skeleton, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import Dialogs from "components/Dialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "redux/api/admin";
import Create from "./component";
import EmptyCell from "components/EmptyTable";

const Categories = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeletons />;
  // if (error) return <Typography>Something went wrong...</Typography>;
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

        <Grid
          item
          container
          justifyContent="space-between"
          gap={{ md: 4, sm: 2, xs: 4 }}
        >
          {categories?.length > 0 ? (
            categories?.map((item) => {
              const { id, title, description } = item;
              return (
                <Grid
                  item
                  md={3.5}
                  sm={5}
                  xs={12}
                  key={id}
                  sx={{ boxShadow: 0 }}
                >
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
            })
          ) : (
            <EmptyCell
              paginationLabel="Categories Per page"
              headCells={["Categories", "Name", "Description", "Title"]}
            />
          )}
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

function Skeletons() {
  return (
    <Grid item container gap={4}>
      <Skeleton
        sx={{ height: "5rem", marginLeft: "auto", width: "15rem" }}
        animation="wave"
        variant="rectangular"
      />
      <Grid item container gap={3}>
        <Grid item container gap={3} flexWrap={{ md: "nowrap", xs: "wrap" }}>
          {Array(3)
            .fill(undefined)
            .map((item, index) => (
              <Skeleton
                key={index}
                sx={{ height: "15rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            ))}
        </Grid>
        <Grid item container gap={3} flexWrap={{ md: "nowrap", xs: "wrap" }}>
          {Array(3)
            .fill(undefined)
            .map((item, index) => (
              <Skeleton
                key={index}
                sx={{ height: "15rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Categories;
