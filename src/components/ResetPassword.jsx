import { Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import CustomButton from "./CustomButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useResetPasswordMutation } from "redux/api/authSlice";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  newPassword: Yup.string()
    .required("Enter your password")
    .min(8, "password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
  confirmPassword: Yup.string("Password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password is required"),

  token: Yup.string()
    .min(5, "OTP Should be minimum of 5 character")
    .required("Token is required"),
});

const ResetPassword = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();
  const onSubmit = async (values) => {
    const { email, newPassword, confirmPassword, token } = values;

    const { data, error } = await resetPassword({
      email: email,
      password: newPassword,
      password_confirmation: confirmPassword,
      otp: token,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    }
    if (error) toast.error(error);
  };
  return (
    <Grid item container>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{
          email: searchParams.get("email") || "",
          token: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
      >
        <Form noValidate style={{ width: "100%" }}>
          <Grid
            item
            container
            flexDirection={"column"}
            gap={2}
            sx={{ mb: 3 }}
            alignItems="center"
          >
            <Typography variant="h1">Reset Password ?</Typography>

            <Typography
              textAlign={"center"}
              fontSize={"1.62rem"}
              color="#b5b5c3"
              fontWeight={500}
            >
              Enter your new password and otp to reset your password.{" "}
            </Typography>
            {/* end::Link */}
          </Grid>

          <Grid item container flexDirection={"column"} gap={3}>
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
                name="newPassword"
                type="password"
                placeholder="New Password"
                autoComplete="off"
              />
            </Grid>
            <Grid item container>
              <FormikControl
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
              />
            </Grid>
            <Grid item container>
              <FormikControl
                name="token"
                type="number"
                placeholder="Enter your token"
                autoComplete="off"
              />
            </Grid>
            {/* end::Form group */}

            {/* begin::Form group */}
            <Grid
              item
              container
              gap={3}
              flexWrap="nowrap"
              justifyContent={"center"}
              sx={{ mt: 2 }}
            >
              <Grid item md={3} xs={4}>
                <CustomButton
                  type="submit"
                  isSubmitting={loading}
                  title="Submit"
                />
              </Grid>

              <Grid item md={3} xs={4}>
                <CustomButton
                  type="button"
                  backgroundColor={"#d20c831a"}
                  title={"Cancel"}
                  component={Link}
                  color="#d20c8380"
                  to="/auth/login"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* end::Form group */}
        </Form>
      </Formik>
    </Grid>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
