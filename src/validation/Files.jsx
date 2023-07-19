import { Grid, IconButton, Typography } from "@mui/material";
import UploadIcon from "assets/svg/Upload";
import { useFormikContext } from "formik/dist";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const UploadComponent = ({ name, multiple, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [file, setFile] = useState({
    files: [],
    preview: [],
  });
  const ref = useRef();
  useEffect(() => {
    setFieldValue(name, {
      file: file.files,
      preview: file.preview,
    });
    //eslint-disable-next-line
  }, [file, name]);

  const handleUpload = (files) => {
    let arr = [];
    // for (let i = 0; i <= files.length - 1; i++) {

    // }

    const maxSize = 5 * 1024 * 1024; // Maximum size is 5MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileSize = file.size; // File size in bytes

      if (fileSize <= maxSize) {
        const objectUrl = URL.createObjectURL(files[i]);

        arr.push(objectUrl); // File size is within the limit
        // Upload the file or perform further processing
      } else {
        toast.error("Files size greater than the limit of 5MB included");
      }
    }

    setFile({
      files: [...files],
      preview: arr,
    });

    // }
  };

  // HTML

  // function handleFileUpload(files) {
  //   const maxSize = 5 * 1024 * 1024; // Maximum size is 5MB

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const fileSize = file.size; // File size in bytes

  //     if (fileSize <= maxSize) {
  //       const objectUrl = URL.createObjectURL(files[i]);
  //       console.log(objectUrl);
  //       arr.push(objectUrl); // File size is within the limit

  //       console.log(`File ${i + 1} is valid`);
  //     } else {
  //       // File size exceeds the limit
  //       console.log(`File ${i + 1} size is too large`);
  //       // Display an error message or take appropriate action
  //     }
  //   }
  // }

  return (
    <Grid
      id="drop-area"
      item
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection="column"
      sx={{
        border: "2px dashed #a80a69",
        position: "relative",
        minHeight: "15rem",
      }}
    >
      <input
        type="file"
        {...rest}
        ref={ref}
        multiple={multiple}
        onChange={(e) => handleUpload(e.target.files)}
        style={{ display: "none", position: "absolute", inset: 0 }}
        // accept="image/* , .heis"
        accept=".jpg, .png, image/jpeg, image/png, heis"
      />
      <IconButton size="medium" onClick={() => ref?.current.click()}>
        <UploadIcon sx={{ fontSize: "5rem" }} />
      </IconButton>
      <Typography color="secondary" variant="info">
        Maximum file size of 5MB
      </Typography>
    </Grid>
  );
};
