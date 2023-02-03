import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik/dist";
import { Typography, Select, MenuItem, Grid } from "@mui/material";

import { TextError } from "./TextError";

export const Formiks = ({
  borderRadius,
  defaultValue,
  placeholder,
  options,
  ...rest
}) => {
  return (
    <Select
      displayEmpty
      {...rest}
      renderValue={(value) => (
        <Typography color="#828484">
          {value || defaultValue || placeholder}
        </Typography>
      )}
      // placeholder={placeholder}
      sx={{
        borderRadius: borderRadius ? borderRadius : "1rem",
        color: "#828484",
        height: "4rem",

        "&:active,&:focus": {
          borderColor: "currentColor",
          outline: "none",
        },
        "& .MuiSelect-icon": {
          fontSize: "3rem",
          color: "#828484",
        },
      }}
    >
      {/* <MenuItem value="">{placeholder}</MenuItem> */}
      {options?.map((option) => (
        <MenuItem key={option?.value} value={option?.value}>
          {option?.label}
        </MenuItem>
      ))}
    </Select>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
};

const Selects = (props) => {
  const {
    label,
    name,
    type,
    styles,
    helperText,
    options,
    placeholder,
    ...rest
  } = props;
  console.log(rest);
  return (
    <Grid container direction="column">
      <Field
        id={name}
        type="select"
        options={options}
        placeholder={placeholder}
        name={name}
        as={Formiks}
        {...rest}
      />
      {helperText && <Typography variant="span">{helperText}</Typography>}
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Selects.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Selects;
