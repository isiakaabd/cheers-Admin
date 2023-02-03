import { Button, Grid } from "@mui/material";
import React from "react";

const CustomButton = ({ backgroundColor, title, ...rest }) => {
  return (
    <Button
      sx={{
        lineHeight: 1.5,
        fontWeight: 700,
        color: "#fff",
        fontSize: { md: "1.4rem", xs: "1.2rem" },
        width: "100%",
        py: ".8em",
        backgroundColor: backgroundColor ? backgroundColor : "#d20c83",
      }}
      variant="contained"
      size="small"
      {...rest}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
