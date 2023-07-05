import { Typography, Grid } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";

import { useLocation } from "react-router-dom";
import FormikControl from "validation/FormikControl";

// import { useParams } from "react-router-dom";

const Message = () => {
  const location = useLocation();
  const payload = location.state;

  //   const { id } = useParams();
  const onSubmit = () => {};
  return (
    <Grid item container mt={{ xs: 0, md: 4 }}>
      <Grid item md={9} mx="auto" flexDirection={"column"}>
        <Typography variant="h5" sx={{ textAlign: "justify" }}>
          {payload}
        </Typography>

        <Grid item container mt={5}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
          >
            <Form noValidate style={{ width: "100%" }}>
              <Grid item container flexDirection={"column"} gap={3}>
                <Grid item container>
                  <FormikControl
                    name="email"
                    control="textarea"
                    placeholder="Enter Your Response here..."
                    autoComplete="off"
                  />
                </Grid>

                <Grid item md={3} xs={4}>
                  <CustomButton
                    type="submit"
                    title="Submit"
                    //   isSubmitting={loading}
                  />
                </Grid>
              </Grid>
              {/* end::Form group */}
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
