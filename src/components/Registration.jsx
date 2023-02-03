import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { CheckBox } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import * as Yup from "yup";
const Registration = (props) => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("First name is required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    lastname: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Last name is required"),
    phone: Yup.string()
      .min(8, "Minimum 8 digit")
      .max(12, "Maximum 12 digit")
      .required("Phone is required"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
    confirmPassword: Yup.string("Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),

    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  });

  return (
    <Grid item container>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          acceptTerms: false,
          confirmPassword: "",
        }}
      >
        {({ errors }) => {
          console.log(errors);
          return (
            <Form noValidate>
              <Grid
                item
                container
                flexDirection={"column"}
                alignItems="center"
                sx={{ mb: 3 }}
                gap={2}
              >
                <Typography variant="h1">Create an Account</Typography>
                <Typography
                  textAlign={"center"}
                  fontSize={"1.62rem"}
                  color="#b5b5c3"
                  fontWeight={500}
                >
                  Already have an account?
                  <Typography
                    variant="span"
                    component={Link}
                    to="/auth/login"
                    color="primary"
                    fontWeight={700}
                    sx={{ marginLeft: ".5rem", textDecoration: "none" }}
                  >
                    Forgot Password ?
                  </Typography>
                </Typography>
              </Grid>

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
                <Grid item container>
                  <FormikControl
                    name="password"
                    autoComplete="off"
                    type="password"
                    placeholder="password"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="confirmPassword"
                    autoComplete="off"
                    type="password"
                    placeholder="Confrim Password"
                  />
                </Grid>
                <Grid item container flexDirection={"column"}>
                  <Grid
                    item
                    container
                    // gap={0.5}
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <Grid item>
                      <FormikControl name="acceptTerms" control="checkbox" />
                    </Grid>
                    <Typography flex={1} fontSize="1.4rem">
                      I Agree the{" "}
                      <Typography
                        variant="span"
                        to="#"
                        color="primary"
                        sx={{ textDecoration: "none" }}
                        component={Link}
                      >
                        terms and conditions.
                      </Typography>
                    </Typography>
                  </Grid>
                  {errors.acceptTerms && (
                    <Typography variant="error" color="error">
                      {errors.acceptTerms}
                    </Typography>
                  )}
                </Grid>
                <Grid item container gap={3}>
                  <CustomButton title="Submit" type="submit" />
                  <CustomButton
                    title="Cancel"
                    component={Link}
                    to="/auth/login"
                    backgroundColor="#d20c8380"
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

Registration.propTypes = {};

export default Registration;
