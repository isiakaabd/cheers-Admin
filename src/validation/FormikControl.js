// import React from "react";
import Input from "./Input";
import Selects from "./Select";
// import Checkboxes from "./Checkboxs";
// import DateComponent from "./Date";
// import Textarea from "./Textarea";
import PropTypes from "prop-types";
import InputsAdornment from "./InputsAdornment";
import SelectAdornment from "./SelectAdornment";
import SwitchComponent from "./Switch";
import { UploadComponent } from "./Files";
import CheckBox from "./CheckBox";
// import Files from "./File";
// import Files2 from "./File2";
// import DateTimePicker from "./DateTimePicker";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "inputs":
      return <InputsAdornment {...rest} />;
    case "selects":
      return <SelectAdornment {...rest} />;
    case "select":
      return <Selects {...rest} />;
    case "switch":
      return <SwitchComponent {...rest} />;
    case "file":
      return <UploadComponent {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;

    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string,
};
FormikControl.defaultProps = {
  control: "input",
};
export default FormikControl;
