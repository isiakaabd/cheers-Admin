import { Button } from "@mui/material";
import Loader from "./Loader";

const CustomButton = ({
  isSubmitting,
  color,
  backgroundColor,
  title,
  ...rest
}) => {
  return (
    <Button
      sx={{
        lineHeight: 1.5,
        fontWeight: 700,
        textTransform: "capitalize",
        color: color ? color : "#fff",
        fontSize: { md: "1.4rem", xs: "1.2rem" },
        width: "100%",
        py: ".8em",
        "&:hover": {
          backgroundColor: backgroundColor ? backgroundColor : "#d20c83",
        },
        backgroundColor: backgroundColor ? backgroundColor : "#d20c83",
      }}
      variant="contained"
      size="small"
      {...rest}
    >
      {!isSubmitting && title}

      {isSubmitting && <Loader size={20} color="info" />}
    </Button>
  );
};

export default CustomButton;
