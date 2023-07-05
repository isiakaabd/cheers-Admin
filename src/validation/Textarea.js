import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";
import { TextError } from "./TextError";

const Text = ({ ...rest }) => (
  <TextField id="outlined-multiline-static" {...rest} multiline minRows={5} />
);
const TextArea = (props) => {
  const { name, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field id={name} name={name} as={Text} type={"textarea"} {...rest} />

      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
TextArea.propTypes = {
  name: PropTypes.string,
};

export default TextArea;
