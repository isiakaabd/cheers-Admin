import { Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik/dist";
import FormikControl from "validation/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "redux/api/authSlice";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
});
const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();

  const onSubmit = async (values, { resetForm }) => {
    const { data, error } = await forgotPassword({ email: values?.email });
    if (error) {
      toast.error(error?.email[0]);
    }
    if (data) {
      toast.success(data);
      setTimeout(() => {
        navigate({
          pathname: "/auth/reset-password",
          search: `?email=${values?.email}`,
        });
      }, 3000);
      resetForm();
    }
  };
  return (
    <Grid item container>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onSubmit}
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
            <Typography variant="h1">Forgot Password ?</Typography>

            <Typography
              textAlign={"center"}
              fontSize={"1.62rem"}
              color="#b5b5c3"
              fontWeight={500}
            >
              Enter your email to reset your password.
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
                  title="Submit"
                  isSubmitting={loading}
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

ForgotPassword.propTypes = {};

export default ForgotPassword;
