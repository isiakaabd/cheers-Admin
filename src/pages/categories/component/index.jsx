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
  propertiesArray: Yup.array().min(1, "At least one item is required"),
});
export function isValidJSON(array) {
  try {
    JSON.parse(array);
    return true;
  } catch (error) {
    return false;
  }
}

const Create = ({
  heading,
  title,
  id,
  setOpen,
  propertiesArray,
  description,
  type,
}) => {
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [create, { isLoading: loading }] = useCreateCategoryMutation();
  const handleSubmit = async (values) => {
    const { title, description, propertiesArray } = values;
    console.log(propertiesArray);
    let x = propertiesArray.map((item) => {
      // console.log(typeof item.variants);
      // if (typeof item.variants === "string") {
      //   console.log(item.variants);
      // }
      return {
        name: item.name,
        variants:
          typeof item.variants === "string"
            ? item.variants.split(",").map((variant) => variant.trim())
            : item.variants,
      };
    });
    let stingifyObj = JSON.stringify(x);
    const obj = {
      name: title,
      description,
      attributes: stingifyObj,
    };
    const formData = new FormData();

    formData.append("name", title);
    formData.append("description", description);
    formData.append("properties", stingifyObj);

    formData.append("_method", "PUT");
    if (isValidJSON(stingifyObj)) {
      const { data, error } = await updateCategory({
        x: obj,
        categoryId: id,
      });
      if (data) {
        toast.success(data?.message);
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }

      if (error) toast.error(error);
      else {
        console.log("Error");
        // toast.error(
        //   "An error occurred while trying to process your properties. Please try again"
        // );
      }
    }
    // const { data, error } = await updateCategory({ x, categoryId: id });

    // if (data) {
    //   toast.success(data?.message);

    //   setTimeout(() => {
    //     setOpen(false);
    //   }, 1000);
    // }
    // if (error) toast.error(error.message || "something went wrong....");
  };

  const handleCreateCategory = async (values) => {
    const { description, title, propertiesArray } = values;
    let x = propertiesArray.map((item) => {
      return {
        name: item.name,
        variants: item.variants.split(",").map((variant) => variant.trim()),
      };
    });
    let stingifyObj = JSON.stringify(x);
    if (isValidJSON(stingifyObj)) {
      const { data, error } = await create({
        name: title,
        description,
        properties: stingifyObj,
      });
      if (data) {
        toast.success(data?.message);
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }

      if (error) toast.error(error);
      else {
        console.log("Error");
        // toast.error(
        //   "An error occurred while trying to process your properties. Please try again"
        // );
      }
    }
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
            propertiesArray: propertiesArray
              ? JSON.parse(propertiesArray)
              : [] || [],
            properties: "",
          }}
          onSubmit={type === "edit" ? handleSubmit : handleCreateCategory}
        >
          {({ values, setFieldValue, errors }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Grid item container gap={2}>
                  <Grid item container>
                    <FormikControl name="title" placeholder="Title" />
                  </Grid>
                  <Grid item container>
                    <FormikControl
                      name="description"
                      placeholder="Description"
                    />
                  </Grid>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item flex={1}>
                      <FormikControl
                        name="properties"
                        placeholder="Add a property"
                      />
                    </Grid>

                    <Grid item>
                      <CustomButton
                        type="button"
                        disabled={!values.properties}
                        onClick={() => {
                          setFieldValue("propertiesArray", [
                            ...values.propertiesArray,
                            {
                              name: values.properties,
                              variants: "",
                            },
                          ]);
                          setTimeout(() => setFieldValue("properties", ""), 10);
                        }}
                        title={"Add Properties"}
                      />
                    </Grid>
                  </Grid>
                  {values?.propertiesArray?.length > 0 &&
                    values?.propertiesArray?.map((property, index) => {
                      return (
                        <Grid item container flexWrap="nowrap" gap={2} mt={1}>
                          <Grid item flex={1}>
                            <FormikControl
                              name={`propertiesArray[${index}].variants`}
                              label={property.name}
                              placeholder={`${property.name}- use Comma(,) for more than one property e.g red,green,blue`}
                            />
                          </Grid>
                          <Grid item>
                            <CustomButton
                              color={"secondary"}
                              type="button"
                              onClick={() => {
                                const arr = values.propertiesArray.filter(
                                  (item) => item.name !== property.name
                                );
                                setFieldValue("propertiesArray", arr);
                              }}
                              title={"Delete "}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  {/* <FormikControl 
                       value=
                       name={`propertiesArray[${index}].variant`}
                       label={property.name}
                      placeholder={`${property.name}- use Comma(,) for more than one property e.g red,green,blue`}
                    /> */}
                  <Grid item container sx={{ mt: 3 }}>
                    <CustomButton
                      title="Submit"
                      width="100%"
                      type="submit"
                      isSubmitting={updating || loading}
                    />
                  </Grid>{" "}
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Create;
