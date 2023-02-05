import { styled } from "@mui/material/styles";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import { ErrorMessage, Field } from "formik/dist";
import PropTypes from "prop-types";
import { TextError } from "./TextError";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#FF9B04",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 25,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Switchs = ({ label, name, value, ...rest }) => {
  return (
    <FormControlLabel
      control={<IOSSwitch sx={{ m: label ? 1 : 0 }} name={name} {...rest} />}
      label={label}
    />
  );
};

const SwitchComponent = (props) => {
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
SwitchComponent.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default SwitchComponent;
