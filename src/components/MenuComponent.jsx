import Menu from "@mui/material/Menu";

export default function BasicMenu({
  open,
  anchorEl,
  setAnchorEl,
  children,
  handleClick,
  handleClose,
}) {
  return (
    <Menu
      elevation={12}
      //   sx={{ }}
      id="basic-menu"
      anchorEl={anchorEl}
      sx={{
        "& .MuiMenu-paper": {
          boxShadow: "3px 6px 9px -3px rgba(0,0,0,0.86)",
        },
      }}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {children}
    </Menu>
  );
}
