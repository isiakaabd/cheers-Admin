import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#000",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  paddingLeft: "8rem",
  paddingBlock: "1rem",
  paddingRight: "2rem",
  ...(open && {
    marginLeft: drawerWidth,
    paddingLeft: "0",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Footer = ({ open }) => {
  return (
    <AppBar
      position="fixed"
      component="footer"
      color="primary"
      open={open}
      sx={{ top: "auto", bottom: 0 }}
    >
      <Grid item container flexWrap="nowrap" alignItems="flex-end">
        <Grid item flex={1}>
          <Typography
            sx={{
              color: "#7e8299",
              fontSize: { md: "2rem", xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            {" "}
            2023&nbsp; &copy; &nbsp;
            <Typography variant="span" color="text.primary">
              Cheers
            </Typography>
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            item
            container
            alignItems="center"
            sx={{
              pr: { md: "2rem", xs: "1rem" },
            }}
            gap={{ md: 4, xs: 2 }}
          >
            <Typography
              component={Link}
              to="#"
              sx={{
                textDecoration: "none",
                color: "#7e8299",
                fontSize: { md: "2rem", xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              About
            </Typography>
            <Typography
              component={Link}
              to="#"
              sx={{
                textDecoration: "none",
                color: "#7e8299",
                fontSize: { md: "2rem", xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Account
            </Typography>
            <Typography
              component={Link}
              to="#"
              sx={{
                textDecoration: "none",
                color: "#7e8299",
                fontSize: { md: "2rem", xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Purchase
            </Typography>
            {/* <List sx={{ display: "flex", alignItems: "center" }}>
            <ListItem disableGutters>
              <ListItemButton>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton>
                <ListItemText primary="Purchase" />
              </ListItemButton>
            </ListItem>
          </List> */}
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Footer;
