import { Grid, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "redux/api/admin";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("required"),
  description: Yup.string("").required("required"),
});

const Create = ({ heading, title, id, setOpen, description, type }) => {
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [create, { isLoading: loading }] = useCreateCategoryMutation();
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

  const handleCreateCategory = async (values) => {
    const { description, title } = values;

    const { data, error } = await create({
      name: title,
      description,
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
    <Grid item container gap={2} sx={{ pt: 0, height: "100%" }}>
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
            title: title || "",
            description: description || "",
          }}
          onSubmit={type === "edit" ? handleSubmit : handleCreateCategory}
        >
          <Form style={{ width: "100%" }}>
            <Grid item container gap={2}>
              <Grid item container>
                <FormikControl name="title" placeholder="Title" />
              </Grid>
              <Grid item container>
                <FormikControl name="description" placeholder="Description" />
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

export default Create;
