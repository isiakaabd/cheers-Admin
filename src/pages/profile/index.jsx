import { Grid, Skeleton, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import React from "react";
import { useGetAdminProfileQuery } from "redux/api/authSlice";
import FormikControl from "validation/FormikControl";

const Profile = () => {
  const { data: profile, isLoading, error } = useGetAdminProfileQuery();

  if (isLoading) return <Skeletons />;
  if (error || !profile) return <Typography>Something went wrong..</Typography>;
  const { email, first_name, last_name, phone } = profile;
  return (
    <Grid item container>
      <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
        <Formik
          enableReinitialize
          // onSubmit={onSubmit}
          // validationSchema={validationSchema}
          initialValues={{
            firstname: first_name || "",
            lastname: last_name || "",
            email: email || "",
            phone: phone || "",
          }}
        >
          <Form noValidate>
            <Typography sx={{ mb: 2 }} variant="h1">
              Profile
            </Typography>

            <Grid item container gap={2}>
              <Grid item container gap={2} flexWrap="nowrap">
                <Grid item xs={6}>
                  <FormikControl
                    name="firstname"
                    autoComplete="off"
                    placeholder="First name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikControl
                    name="lastname"
                    autoComplete="off"
                    placeholder="Last name"
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <FormikControl
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                />
              </Grid>
              <Grid item container>
                <FormikControl
                  name="phone"
                  autoComplete="off"
                  placeholder="Phone"
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};
function Skeletons() {
  return (
    <Grid item container>
      <Grid item sx={{ mx: "auto" }} md={8} xs={12}>
        <Grid item container gap={3}>
          <Skeleton
            sx={{ height: "4rem", width: "15rem" }}
            animation="wave"
            variant="rectangular"
          />
          <Grid item container gap={2}>
            <Grid container flexWrap={"nowrap"} gap={2}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
            <Grid container flexWrap={"nowrap"}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
            <Grid container flexWrap={"nowrap"}>
              <Skeleton
                sx={{ height: "5rem", width: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Profile;
