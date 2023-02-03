// import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { useSnackbar } from "notistack";
// import { makeStyles } from "@mui/styles";
// import { Field, ErrorMessage } from "formik";
// import { TextError } from "components/Utilities/TextError";
// import {
//   FormControl,
//   FormLabel,
//   Grid,
//   // Avatar,
//   Button,
//   Typography,
// } from "@mui/material";
// import { useFormikContext } from "formik";
// import { Loader } from "components/Utilities";
// import { RequiredIcon } from "components/Typography";
// import { ReactComponent as UploadIcon } from "assets/images/document-upload.svg";
// import {
//   compressAndUploadImage,
//   showErrorMsg,
//   showSuccessMsg,
//   uploadImage,
// } from "helpers/filterHelperFunctions";

// const useStyles = makeStyles((theme) => ({
//   FormLabel: {
//     "&.MuiFormLabel-root": {
//       ...theme.typography.FormLabel,
//     },
//   },

//   uploadBtn: {
//     "&.MuiButton-root": {
//       ...theme.typography.btn,
//       background: "#f2f2f2",
//       boxShadow: "none",
//       borderRadius: "5px",
//       fontSize: "1.4rem",
//       color: theme.palette.common.black,

//       "&:hover": {
//         background: "#f2f3f3",
//         boxShadow: "none",
//       },

//       "&:active": {
//         boxShadow: "none",
//       },
//     },
//   },
// }));

// export const Formiks = ({ name, onBlur, value }) => {
//   const { setFieldValue } = useFormikContext();
//   const fileRef = useRef(null);
//   const classes = useStyles();
//   const { enqueueSnackbar } = useSnackbar();
//   const [preview, setPreview] = useState("");
//   const [isCompleted, setIsCompleted] = React.useState(null);
//   const [progress, setProgress] = useState();
//   const [isCompressing, setIsCompressing] = React.useState(false);

//   useEffect(() => {
//     if (value) {
//       setPreview(value);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     isCompleted === "passed" &&
//       showSuccessMsg(enqueueSnackbar, Typography, "Image upload complete.");
//     if (isCompleted === "failed") {
//       showErrorMsg(enqueueSnackbar, "Image upload failed, Try again.");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isCompleted]);

//   const onChange = async (e) => {
//     const file = e.target.files[0];
//     setProgress(1);
//     compressAndUploadImage(
//       file,
//       uploadImage,
//       setPreview,
//       name,
//       setFieldValue,
//       setProgress,
//       setIsCompressing,
//       setIsCompleted
//     );

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => setPreview(reader.result);
//   };

//   return (
//     <>
//       <Grid
//         item
//         container
//         spacing={2}
//         alignItems="center"
//         justifyContent="center"
//         flexDirection="column"
//         sx={{ position: "absolute", height: "100%" }}
//       >
//         {progress < 100 ||
//           (isCompressing && (
//             <Grid container item justifyContent="center" alignItems="center">
//               <Typography component="span">
//                 {isCompressing ? "Compressing image" : "Uploading image"}
//               </Typography>
//               <Loader />
//             </Grid>
//           ))}
//         <>
//           <Grid
//             item
//             container
//             sx={{ inset: 0, position: "absolute", height: "100%" }}
//           >
//             <FormControl fullWidth sx={{ height: "100%", width: "100%" }}>
//               <Grid
//                 item
//                 container
//                 justifyContent="center"
//                 alignItems="center"
//                 sx={{
//                   height: "100%",
//                   position: "absolute",
//                 }}
//               >
//                 <UploadIcon
//                   variant="contained"
//                   onClick={() => fileRef.current.click()}
//                   component="span"
//                   className={classes.uploadBtn}
//                 />
//                 <input
//                   accept="image/png, image/gif, image/jpeg"
//                   onChange={onChange}
//                   type="file"
//                   name={name}
//                   onBlur={onBlur}
//                   style={{
//                     inset: 0,
//                     position: "absolute",
//                     height: "100%",
//                     width: "100%",
//                     cursor: "pointer",
//                     opacity: 0,
//                     zIndex: 800,
//                   }}
//                   ref={fileRef}
//                 />
//               </Grid>
//             </FormControl>
//           </Grid>
//         </>
//       </Grid>
//       {preview && isCompleted !== "failed" && (
//         <Grid item sx={{ top: "20%" }}>
//           <Avatar sx={{ backgroundColor: "#eaeaea" }} src={preview} />
//         </Grid>
//       )}
//     </>
//   );
// };

// Formiks.propTypes = {
//   value: PropTypes.string,
//   label: PropTypes.string,
//   onChange: PropTypes.func,
//   children: PropTypes.node.isRequired,
//   name: PropTypes.string.isRequired,
//   onBlur: PropTypes.func,
//   setFieldValue: PropTypes.func,
// };

// const Files2 = (props) => {
//   const { name, label, isRequired, ...rest } = props;
//   const classes = useStyles();
//   return (
//     <Grid
//       item
//       container
//       direction="column"
//       justifyContent="center"
//       alignItems="center"
//       gap={1}
//       sx={{
//         border: "4px dashed #979797",
//         height: "30rem",
//         position: "relative",
//       }}
//     >
//       <FormLabel className={classes.FormLabel} sx={{ mt: "10em" }}>
//         {label} {isRequired && <RequiredIcon />}
//       </FormLabel>
//       <Field name={name} as={Formiks} label={label} {...rest} />
//       <ErrorMessage name={name} component={TextError} />
//     </Grid>
//   );
// };

// Files2.propTypes = {
//   label: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   placeholder: PropTypes.string,
//   isRequired: PropTypes.bool,
// };

// export default Files2;
