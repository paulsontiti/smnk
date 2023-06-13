import { Badge, Box, Drawer, IconButton } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InfoAlert from "../alerts/Info";

function Notification() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (label: string) => {
    setAnchorEl(null);
  };
  return (
   <> <IconButton sx={{ color: "white" }} onClick={()=>{setOpenDrawer(true)}}>
   <Badge color="error" variant="dot">
     {true ? <NotificationsActiveIcon /> : <NotificationsIcon />}
   </Badge>
 </IconButton>
    <Drawer
    anchor="top"
    open={openDrawer}
    onClose={() => {
      setOpenDrawer(false);
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem .0rem",
        padding: ".5rem",
      }}
    >
      <InfoAlert message="Work in Progress"/> 
    </Box>
  </Drawer></>
  );
}

export default Notification;
