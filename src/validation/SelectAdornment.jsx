import React from "react";
import { Field, ErrorMessage } from "formik/dist";
import PropTypes from "prop-types";
import {
  IconButton,
  Box,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { TextError } from "./TextError";

const Text = ({
  placeholder,
  options,
  color,
  height,
  borderRadius,
  buttonStyle,
  border,
  Icon,
  ...rest
}) => {
  return (
    <Select
      displayEmpty
      {...rest}
      sx={{
        borderRadius: borderRadius ? borderRadius : "3rem",
        color: color ? color : "#828484",
        height: height ? height : "4rem",
        border: border,
        paddingInline: " 1rem",
        "&:active,&:focus": {
          borderColor: "currentColor",
          outline: "none",
        },
        "& .MuiSelect-icon": {
          fontSize: "3rem",
          color: color ? color : "#828484",
        },
      }}
      renderValue={(value) => {
        return (
          <Box
            sx={{
              display: "flex",
              ml: 0,
              alignItems: "center",
              border: "none",
              // paddingInline: " 1rem",
            }}
          >
            <IconButton edge="start">
              <Icon
                sx={{
                  fontSize: "2rem",
                  color: color,
                  // ml: -2,
                  ...buttonStyle,
                }}
              />
            </IconButton>

            <Typography>{value || placeholder}</Typography>
          </Box>
        );
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    // </Grid>
  );
};

const SelectAdornment = (props) => {
  const { label, name, type, styles, borderRadius, ...rest } = props;
  // const classes = useStyles();
  return (
    <Grid container direction="column">
      <Field
        id={name}
        name={name}
        as={Text}
        {...rest}
        borderRadius={borderRadius}
      />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};
SelectAdornment.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default SelectAdornment;
