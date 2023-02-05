import { useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import FormikControl from "validation/FormikControl";
import CustomButton from "./CustomButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik/dist";
import * as Yup from "yup";
import {
  useResendTokenMutation,
  useVerifyEmailMutation,
} from "redux/api/authSlice";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  token: Yup.string()
    .min(6, "Minimum of six digit")
    .max(6, "Maximum of six digit")
    .required("Token is required"),
});

const VerifyEmail = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading: loading }] = useVerifyEmailMutation();
  const [resendVerificationEmail, { error, data, isLoading: resending }] =
    useResendTokenMutation();
  const onSubmit = async (values, { setStatus, setSubmitting }) => {
    const { data, error } = await verifyEmail({
      email: values.email,
      token: values.token,
    });
    if (error) toast.error(error);
    if (data) {
      toast.success(data);
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    }
  };
  useEffect(() => {
    if (data || error) toast.success(data || error);
  }, [data, error]);
  return (
    <Grid item container>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{
          email: searchParams.get("email") || "",
          token: "",
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form noValidate style={{ width: "100%" }}>
            <Grid
              item
              container
              flexDirection={"column"}
              gap={2}
              sx={{ mb: 3 }}
              alignItems="center"
            >
              <Typography variant="h1">Verify your Email</Typography>

              <Typography
                textAlign={"center"}
                fontSize={"1.62rem"}
                color="#b5b5c3"
                fontWeight={500}
              >
                Enter your OTP.
              </Typography>
              {/* end::Link */}
            </Grid>

            <Grid item container flexDirection={"column"} gap={3}>
              <Grid item container gap={2}>
                <Grid item container>
                  <FormikControl
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="token"
                    type="number"
                    placeholder="OTP"
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              {/* end::Form group */}

              {/* begin::Form group */}
              <Grid
                item
                container
                gap={2}
                flexWrap="nowrap"
                justifyContent={"center"}
                sx={{ mt: 2 }}
              >
                <Grid item md={3} xs={3}>
                  <CustomButton
                    type="submit"
                    title="Submit"
                    isSubmitting={loading}
                  />
                </Grid>

                <Grid item md={3} xs={3}>
                  <CustomButton
                    type="button"
                    backgroundColor={"#d20c831a"}
                    title={"Cancel"}
                    component={Link}
                    color="#d20c8380"
                    to="/auth/login"
                  />
                </Grid>
                <Grid item md={4} xs={5}>
                  <CustomButton
                    type="submit"
                    isSubmitting={resending}
                    title={"Resend Token"}
                    onClick={() => {
                      resendVerificationEmail({ email: values.email });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* end::Form group */}
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

VerifyEmail.propTypes = {};

export default VerifyEmail;
