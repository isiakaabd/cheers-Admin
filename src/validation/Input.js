import React from "react";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
// import { makeStyles } from "@mui/styles";
import { Grid, TextField, Typography } from "@mui/material";
import { TextError } from "./TextError";
const Text = ({ placeholder, ...rest }) => {
  return (
    <TextField
      id="outlined-basic"
      {...rest}
      size="small"
      label={placeholder}
      variant="filled"
    />
  );
};

const Input = (props) => {
  const { label, name, type, borderRadius, helperText, styles, ...rest } =
    props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        type={type ? type : "text"}
        {...rest}
        as={Text}
        // style={{
        //   minHeight: "4rem",
        //   borderRadius: borderRadius ? borderRadius : "1rem",
        //   outline: 0,
        //   padding: "0.5rem 1.5rem",
        //   width: "100%",
        //   ...styles,
        //   color: "#828484",
        //   border: "1px solid rgba(0,0,0,0.2)",
        // }}
      />
      {helperText && (
        <Typography
          variant="span"
          color="#9B9A9A"
          sx={{ md: ".5rem", xs: ".2rem" }}
          fontSize={{ md: "1.2rem", xs: "1rem" }}
        >
          {helperText}
        </Typography>
      )}
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
