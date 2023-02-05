import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ErrorMessage, Field } from "formik/dist";
import PropTypes from "prop-types";
import { TextError } from "./TextError";

const Switchs = ({ label, name, value, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          // sx={{ m: label ? 1 : 0 }}
          size="large"
          name={name}
          {...rest}
        />
      }
    />
  );
};

const CheckBox = (props) => {
  const { label, value, name, placeholder, ...rest } = props;

  return (
    <Grid container direction="column">
      <Field
        id={name}
        type="checkbox"
        label={label ? label : null}
        name={name}
        as={Switchs}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
CheckBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default CheckBox;
