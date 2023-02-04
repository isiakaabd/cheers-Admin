import { useRef, useEffect } from "react";
import {
  Dialog,
  Grid,
  useMediaQuery,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function Dialogs({
  children,
  isOpen,
  handleClose,
  width,
  title,
}) {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      // maxWidth={width}
      open={isOpen}
      onClose={handleClose}
      scroll={"body"}
      fullScreen={fullScreen}
      sx={{ m: 0 }}
      title={title}
    >
      <DialogActions>
        <Grid item sx={{ p: 2 }}>
          <CloseOutlined
            onClick={handleClose}
            style={{
              color: "#000",
              fontSize: { md: 30, sm: 25, xs: 20 },
              cursor: "pointer",
            }}
          />
        </Grid>
      </DialogActions>
      <DialogContent sx={{ pt: 0, height: "100%" }}>{children}</DialogContent>
    </Dialog>
  );
}
