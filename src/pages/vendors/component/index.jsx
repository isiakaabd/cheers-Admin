import { Grid, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useCreateVendorMutation,
  useUpdateCategoryMutation,
} from "redux/api/admin";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("required"),
  url: Yup.string("").url("Must be a correct URL").required("required"),
});

const CreateGlobalVendor = ({ heading, name, id, setOpen, url, type }) => {
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [CreateVendor, { isLoading: loading }] = useCreateVendorMutation();
  const handleSubmit = async (values) => {
    const { title, description } = values;
    const x = {
      name: title,
      description,
    };

    const { data, error } = await updateCategory({ x, categoryId: id });

    if (data) {
      toast.success(data?.message);

      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
    if (error) toast.error(error.message || "something went wrong....");
  };

  const handleCreateVendor = async (values) => {
    const { name, url } = values;

    const { data, error } = await CreateVendor({
      name,
      url,
    });

    if (data) {
      toast.success(data?.message);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }

    if (error) toast.error(error);
  };
  return (
    <Grid item container gap={2} sx={{ pt: 0 }}>
      <Typography
        color="text.primary"
        fontWeight={700}
        width="100%"
        textAlign="center"
        fontSize={{ md: "2rem", xs: "1.5rem" }}
      >
        {heading}
      </Typography>
      <Grid item container>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={{
            name: name || "",
            url: url || "",
          }}
          onSubmit={type === "edit" ? handleSubmit : handleCreateVendor}
        >
          <Form style={{ width: "100%" }}>
            <Grid item container gap={2}>
              <Grid item container>
                <FormikControl name="name" placeholder="Name" />
              </Grid>
              <Grid item container>
                <FormikControl name="url" placeholder="Enter URL" />
              </Grid>
              <Grid item container sx={{ mt: 3 }}>
                <CustomButton
                  title="Submit"
                  width="100%"
                  type="submit"
                  isSubmitting={updating || loading}
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default CreateGlobalVendor;
