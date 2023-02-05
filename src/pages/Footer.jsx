import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
        <Grid item container alignItems="center" gap={{ md: 4, xs: 2 }}>
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
  );
};

export default Footer;
