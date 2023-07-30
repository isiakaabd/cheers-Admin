import { useState, useMemo, useLayoutEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";

import {
  Divider,
  Box,
  List,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Avatar,
  ClickAwayListener,
  Grid,
  Paper,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  ArrowBackIosNewOutlined,
  DashboardCustomizeOutlined,
  CommuteOutlined,
  KeyboardArrowDownOutlined,
  PersonAddAlt1Outlined,
  ChevronLeftOutlined,
  LogoutOutlined,
  PersonAddAltOutlined,
  CarRentalOutlined,
  MessageOutlined,
  HouseOutlined,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { patterns, predicateBreadcrumbFromUrl } from "./breadcrumb";
import Footer from "./Footer";
import images from "assets/images";
import { useDispatch } from "react-redux";
import { logOut } from "redux/auth/auth.reducers";
import { toast } from "react-toastify";
import { useLogoutMutation } from "redux/api/authSlice";
import NotificationMenu from "components/NotificationMenu";

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
  background: "#000",
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
  const previousIndex = breadcrumbs[breadcrumbs.length - 2].pageIndex;

  const handleClickAway = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  return (
    <Grid container alignItems="center" sx={{ position: "relative" }}>
      <Grid item>
        <IconButton edge="start" onClick={() => navigate(previousIndex)}>
          <ArrowBackIosNewOutlined fontSize="large" color="secondary" />
        </IconButton>
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
            <KeyboardArrowDownOutlined fontSize="medium" />
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
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(fullScreen ? false : true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [id, setId] = useState(0);
  const location = useLocation();
  const splittedLocation = location.pathname.split("/");

  useLayoutEffect(() => {
    sidebarItem.map((page) =>
      page.link === location.pathname || `/${splittedLocation[1]}` === page.link
        ? setId(page.id)
        : null
    );

    //eslint-disable-next-line
  }, [location.pathname]);
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
      name: "Users",
      link: "/users",
      icon: PersonAddAltOutlined,
    },
    {
      id: 2,
      name: "Global Vendors",
      link: "/global-vendors",
      icon: PersonAddAlt1Outlined,
    },
    {
      id: 3,
      name: "Vendors",
      link: "/vendors",
      icon: PersonAddAlt1Outlined,
    },
    {
      id: 4,
      name: "Orders",
      link: "/orders",
      icon: CarRentalOutlined,
    },
    {
      id: 5,
      name: "Local Orders",
      link: "/local-orders",
      icon: HouseOutlined,
    },
    {
      id: 6,
      name: "Categories",
      link: "/categories",
      icon: CommuteOutlined,
    },

    {
      id: 7,
      name: "Message Center",
      link: "/messages",
      icon: MessageOutlined,
    },
  ];
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const handleClicks = async () => {
    const { data, error } = await logout();

    if (data) {
      toast.success(data);
      setTimeout(() => dispatch(logOut()), 3000);

      setTimeout(() => navigate("/auth/login"), 2000);
    }
    if (error) toast.error(error);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ shadow: 0, background: "#eff2f5" }}
      >
        <Toolbar>
          <Grid item flex={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                color: "#1a1a27",
                "&:hover": {
                  color: "#1a1a27",
                },
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ fontSize: "3rem" }} />
            </IconButton>

            <HeaderText />
          </Grid>
          <Grid item>
            <NotificationMenu menuList={["list"]} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "&.MuiDrawer-root": {
            "& .MuiPaper-root": {
              background: "#1a1a27",
              color: "#9899ac",
            },
          },
        }}
      >
        <DrawerHeader sx={{ py: 2 }}>
          <Link to="/" style={{ marginRight: "auto" }}>
            <Avatar
              src={images.logo}
              variant="rounded"
              sx={{ display: { md: "block", xs: "none" } }}
            />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "#d20c83", fontSize: "3rem" }} /> //#a1a5b7
            ) : (
              <ChevronLeftOutlined
                sx={{ color: "#d20c83", fontSize: "3rem" }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            pb: "2.5rem",
          }}
        >
          {sidebarItem.map((text, index) => (
            <ListItem
              key={text.id}
              disablePadding
              sx={{
                display: "block",
                color: "#9899ac",

                "&:hover >*, &:hover &.MuiListItemIcon-root": {
                  color: "#fff !important",
                  transition: "color 1ms ease-in",
                },
              }}
            >
              <ListItemButton
                selected={id === index}
                sx={{
                  "& .MuiListItemButton": {
                    color: "inherit",
                    "&:hover": {
                      color: "#fff",
                    },
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  setId(index);
                  navigate(text.link);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: "inherit",
                    "&:hover": {
                      color: "#fff",
                    },
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <text.icon sx={{ fontSize: "2.5rem", color: "inherit" }} />
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                  primaryTypographyProps={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            disablePadding
            sx={{
              display: "block",
              mt: "auto",
              pb: 2,
            }}
          >
            <ListItemButton
              sx={{
                color: "#f00",
                "&:hover": {
                  color: "#f00",
                },
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
              }}
              onClick={handleClicks}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  fontSize: "2rem",
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutOutlined sx={{ fontSize: "3rem", color: "#f00" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          background: "#eff2f5",
          display: "flex",
          overflowX: "hidden",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Grid
          item
          container
          sx={{ background: "#eff2f5", height: "100%", pb: "5rem" }}
        >
          <Outlet />
        </Grid>
        <Grid sx={{ mt: "auto" }}>
          <Footer open={open} />
        </Grid>
      </Box>
    </Box>
  );
}
