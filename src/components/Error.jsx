import { Typography } from "@mui/material";
import React from "react";

const Error = ({ error }) => {
  console.log(error);
  return (
    <Typography variant="h3">
      {error.error || error.message || "Something Went Wrong.."}
    </Typography>
  );
};

export default Error;
