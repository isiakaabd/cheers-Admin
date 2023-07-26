import {
  Typography,
  Grid,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  IconButton,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomButton from "components/CustomButton";
import { Formik, Form } from "formik/dist";
import { useLocation } from "react-router-dom";
import {
  useChangeSupportTicketMutation,
  useGetSupportResponsesMutation,
  useReplySupportMutation,
} from "redux/api/admin";
import FormikControl from "validation/FormikControl";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
import Loader from "components/Loader";
import { getTimeMoment } from "utilis";
import BasicMenu from "components/MenuComponent";
import { toast } from "react-toastify";

const Message = () => {
  const location = useLocation();
  const payload = location.state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEls, setAnchorEls] = useState(null);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const open = Boolean(anchorEl);
  const opens = Boolean(anchorEls);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  // Function to handle the button click and show the image viewer
  const handleButtonClick = (values) => {
    const data = values?.map((value) => {
      return {
        src: value.original_url,
        alt: value.file_name,
      };
    });
    setIsViewerVisible(true);
    setImages(data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClicks = (event) => {
    setAnchorEls(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleCloses = () => setAnchorEls(null);
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [getResponse, { data, isLoading: loading }] =
    useGetSupportResponsesMutation();
  const [status, setStatus] = useState(data?.is_open);
  const [replySupport, { isLoading }] = useReplySupportMutation();
  const [changeTicket] = useChangeSupportTicketMutation();
  useEffect(() => {
    setStatus(data?.is_open);
  }, [data?.is_open]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getResponse({ support_id: id });

      if (data) {
        setState(data.replies);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, [id]);
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    const { message, file } = values;

    formData.append("support_id", id);
    formData.append("message", message);
    if (file.file.length > 0) {
      formData.append(`image`, file.file[0]);
    }
    const { data, error } = await replySupport(formData);
    if (data) {
      setState([
        ...state,
        {
          message,
          sender: "admin",
          createdAt: new Date(),
        },
      ]);
      setTimeout(() => resetForm(), 300);
    }
    if (error) toast.error(error.message);
    console.log(data);
  };
  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, "Minimum 10 symbols")
      .required("Message is required"),
  });

  const handleChange = async (setFieldValue, value) => {
    try {
      await changeTicket(id);
      setFieldValue("open", !value);
      setStatus(!value);

      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      toast.error(err.message || "Something went wrong...");
    }
  };
  return (
    <>
      <Grid item container mt={{ xs: 0, md: 4 }}>
        <Grid item md={9} mx="auto" flexDirection={"column"}>
          <Card>
            <CardHeader
              title={payload?.title}
              subheader={payload?.message}
              action={
                <IconButton
                  aria-label="more-action"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              }
            />
            <BasicMenu
              open={open}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <MenuItem>
                <ListItem>
                  <Formik initialValues={{ open: status }}>
                    {({ setFieldValue, values }) => (
                      <Form>
                        <FormikControl
                          control={"switch"}
                          name="open"
                          onChange={() =>
                            handleChange(setFieldValue, values.open)
                          }
                          label={values?.open ? "Open" : "Close"}
                        />
                      </Form>
                    )}
                  </Formik>
                </ListItem>
              </MenuItem>
              <MenuItem onClick={() => handleButtonClick(data?.media)}>
                <ListItem>
                  <ListItemText primary="View Images" />
                </ListItem>
              </MenuItem>
            </BasicMenu>
          </Card>

          {loading ? (
            <Loader color={"#333"} />
          ) : (
            <List dense alignItems="flex-start">
              {state?.map((reply) => (
                <>
                  <ListItem
                    alignItems="flex-start"
                    dense
                    sx={{
                      backgroundColor:
                        reply.sender === "admin" ? "#d9fdd3" : "#a80a69",
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="more-action"
                        id="basic-button"
                        aria-controls={opens ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? "true" : undefined}
                        onClick={handleClicks}
                      >
                        <MoreVertIcon sx={{ fontSize: "2.5rem" }} />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton dense>
                      <ListItemText
                        primary={reply.message}
                        primaryTypographyProps={{ textAlign: "justify" }}
                        secondary={
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "right", width: "100%" }}
                          >
                            {getTimeMoment(reply.created_at)}
                          </Typography>
                        }
                        // primary={reply.title}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="fullWidth" />
                  <BasicMenu
                    open={opens}
                    anchorEl={anchorEls}
                    setAnchorEl={setAnchorEls}
                    handleClick={handleClicks}
                    handleClose={handleCloses}
                  >
                    <MenuItem onClick={() => handleButtonClick(reply?.media)}>
                      <ListItem>
                        <ListItemText primary="View Images" />
                      </ListItem>
                    </MenuItem>
                  </BasicMenu>
                </>
              ))}
            </List>
          )}
          {status ? (
            <Grid item container mt={5}>
              <Formik
                initialValues={{ message: "", file: null }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors }) => (
                  <Form noValidate style={{ width: "100%" }}>
                    <Grid item container>
                      <Typography variant="h4" mb={2} gutterBottom>
                        Reply
                      </Typography>
                    </Grid>
                    <Grid item container flexDirection={"column"} gap={3}>
                      <Grid item container>
                        <FormikControl
                          name="message"
                          control="textarea"
                          placeholder="Enter Your Response here..."
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item container>
                        <FormikControl name="file" control="file" />
                      </Grid>
                      {errors.file && (
                        <Typography color="error" variant="error">
                          {errors.file}
                        </Typography>
                      )}
                      <PhotoProvider>
                        <Grid
                          item
                          container
                          display="grid"
                          gap={1}
                          gridTemplateColumns={{
                            xs: "repeat(auto-fill, minmax(5rem, 1fr))",
                          }}
                        >
                          {values?.file?.preview?.map((item, idx) => (
                            <Grid
                              key={idx}
                              item
                              sx={{
                                // p: 0.5,
                                position: "relative",
                                width: "100%",
                              }}
                            >
                              <PhotoView key={idx} src={item}>
                                <Avatar
                                  variant="square"
                                  src={item}
                                  sx={{
                                    cursor: "pointer",
                                    "& .MuiAvatar-img": {
                                      objectFit: "cover !important",
                                      width: "100%",
                                    },
                                    width: "100%",
                                    maxHeight: "100%",
                                    transition: "border 1ms linear",
                                  }}
                                />
                              </PhotoView>
                            </Grid>
                          ))}
                        </Grid>
                      </PhotoProvider>
                      <Grid
                        item
                        container
                        justifyContent="center"
                        alignItem="center"
                      >
                        <Grid item md={5} xs={10}>
                          <CustomButton
                            type="submit"
                            title="Submit"
                            isSubmitting={isLoading}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* end::Form group */}
                  </Form>
                )}
              </Formik>
            </Grid>
          ) : (
            <Grid item container my={2} justifyContent={"center"}>
              <Typography variant="h3"> Issue has been closed</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {isViewerVisible && (
        <PhotoProvider
          speed={() => 800}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
          images={images}
          visible={isViewerVisible}
          onClose={() => {
            setIsViewerVisible(false);
            handleClose();
            handleCloses();
          }}
        >
          <PhotoSlider
            images={images?.map((item) => ({ src: item, key: item }))}
            visible={isViewerVisible}
            onClose={() => setIsViewerVisible(false)}
            index={index}
            onIndexChange={setIndex}
          />
        </PhotoProvider>
      )}
    </>
  );
};

export default Message;
