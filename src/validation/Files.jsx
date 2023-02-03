import { UploadFileOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useFormikContext } from "formik/dist";
import React, { useRef } from "react";
export const UploadComponent = ({ name, multiple, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const ref = useRef();
  const handleUpload = (file) => {
    setFieldValue(name, file);
  };

  return (
    <Grid
      id="drop-area"
      item
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ border: "1px solid #C4C4C4", minHeight: "15rem" }}
    >
      <input
        type="file"
        {...rest}
        ref={ref}
        multiple={multiple}
        onChange={(e) => handleUpload(e.target.files)}
        style={{ display: "none" }}
        accept="image/*"
      />
      <IconButton size="large" onClick={() => ref?.current.click()}>
        <UploadFileOutlined sx={{ fontSize: "5rem" }} />
      </IconButton>
    </Grid>
  );
};
