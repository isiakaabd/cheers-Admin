import { useState, useMemo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  AccountBox,
  ArrowBackIosNewOutlined,
  DashboardCustomizeOutlined,
  CommuteOutlined,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDownOutlined,
  PersonAddAlt1Outlined,
  PersonAddAlt1Sharp,
  Settings,
} from "@mui/icons-material";
import { ClickAwayListener, Collapse, Grid, Paper } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { patterns, predicateBreadcrumbFromUrl } from "./breadcrumb";
import Footer from "./Footer";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  boxShadow: 1,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const CustomHeaderTitle = ({ title }) => {
  return (
    <div>
      {
        <Grid>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={700}
            fontSize={{ md: "2rem", xs: "1.5rem" }}
            noWrap
            component="div"
          >
            {title}
          </Typography>
        </Grid>
      }
    </div>
  );
};

const Crumb = ({ breadcrumbs }) => {
  //   const history = useHi();
  const [isOpen, setIsOpen] = useState(false);
  const previousText = breadcrumbs[breadcrumbs.length - 2].pageTitle;
  const previousIndex = breadcrumbs[breadcrumbs.length - 2].pageIndex;

  const handleClickAway = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  return (
    <Grid container alignItems="center" sx={{ position: "relative" }}>
      <Grid item>
        <Grid
          container
          alignItems="center"
          onClick={() => navigate(previousIndex)}
          //  onClick={() => history.go(previousIndex)}
          sx={{ cursor: "pointer" }}
        >
          <ArrowBackIosNewOutlined
            fontSize="medium"
            sx={{ marginRight: "0.5rem", color: "#3E5EA9" }}
          />{" "}
          <Typography variant="p" sx={{ color: "#3E5EA9" }}>
            Back to {previousText}
          </Typography>
        </Grid>
      </Grid>
      {breadcrumbs.length > 2 ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "0.5rem",
              cursor: "pointer",
            }}
          >
            <KeyboardArrowDownOutlined
              fontSize="medium"
              sx={{ color: "#3E5EA9" }}
            />
          </Grid>
        </ClickAwayListener>
      ) : null}
      {isOpen && (
        <Paper>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const borderRadius =
              index === breadcrumbs.length - 2
                ? "0px 0px 8px 8px"
                : index === 0
                ? "8px 8px 0px 0px"
                : "";
            if (isLast) {
              return null;
            } else {
              return (
                <button
                  key={index}
                  style={{ borderRadius: borderRadius }}
                  onClick={() => navigate(crumb.pageIndex)}
                  //   onClick={() => history.go()}
                >
                  {crumb.pageTitle}
                </button>
              );
            }
          })}
        </Paper>
      )}
    </Grid>
  );
};

const Breadcrumb = ({ breadcrumbs = [], counts = {} }) => {
  const text = breadcrumbs[breadcrumbs.length - 1]?.pageTitle || "";

  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      {breadcrumbs.length < 2 ? (
        <Grid container alignContent="center">
          <Grid item>
            <CustomHeaderTitle title={text} />
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Crumb breadcrumbs={breadcrumbs} />
          <CustomHeaderTitle title={text} />
        </Grid>
      )}
    </Grid>
  );
};
const HeaderText = () => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(
    () => predicateBreadcrumbFromUrl(patterns, pathname.substring(1)),
    [pathname]
  );

  switch (pathname) {
    case "/dashboard":
      return (
        <Typography
          variant="h6"
          color="primary"
          fontWeight={700}
          fontSize={{ md: "2rem", xs: "1.5rem" }}
          noWrap
          component="div"
        >
          Dashboard
        </Typography>
      );

    default:
      return <Breadcrumb breadcrumbs={breadcrumbs} />;
  }
};
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sidebarItem = [
    {
      id: 0,
      name: "Dashboard",
      link: "/dashboard",
      icon: DashboardCustomizeOutlined,
    },

    {
      id: 1,
      name: "Global Vendors",
      link: "/global-vendors",
      icon: PersonAddAlt1Outlined,
    },
    {
      id: 2,
      name: "Vendors",
      link: "/vendors",
      icon: PersonAddAlt1Outlined,
    },
    {
      id: 3,
      name: "Categories",
      link: "/categories",
      icon: CommuteOutlined,
    },
  ];
  const [opens, setOpens] = useState(true);

  const handleClicks = () => {
    setOpens(!opens);
  };
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={6}
        sx={{ shadow: 0, background: "#eff2f5" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <HeaderText />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarItem.map((text, index) => (
            <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={id === index}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  setId(index);
                  navigate(text.link);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <text.icon />
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleClicks}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Account" sx={{ opacity: open ? 1 : 0 }} />
              {opens ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={opens} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                selected={id === 4}
                sx={{ pl: 4 }}
                onClick={() => {
                  setId(4);
                  navigate("/account");
                }}
              >
                <ListItemIcon>
                  <PersonAddAlt1Sharp />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton
                selected={id === 5}
                sx={{ pl: 4 }}
                onClick={() => {
                  setId(5);
                  navigate("/settings");
                }}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100%",
          width: "100%",
          background: "#eff2f5",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Grid item container sx={{ background: "#eff2f5", height: "100%" }}>
          <Outlet />
        </Grid>
        <Grid sx={{ mt: "auto" }}>
          <Footer />{" "}
        </Grid>
      </Box>
    </Box>
  );
}
