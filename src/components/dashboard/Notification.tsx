import { Badge, Box, Drawer, IconButton } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InfoAlert from "../alerts/Info";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { SmnkErrorBoundary, theme } from "@/pages/_app";

function HomeNotification() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (label: string) => {
    setAnchorEl(null);
  };
  return (
    <SmnkErrorBoundary>
      <>
        <ListItemButton
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <ListItemIcon>
            <Badge color="error" variant="dot">
              {true ? (
                <NotificationsActiveIcon sx={{ color: theme.smnk[1000] }} />
              ) : (
                <NotificationsIcon sx={{ color: theme.smnk[1000] }} />
              )}
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                Notification
              </Typography>
            }
          />
        </ListItemButton>

        {/* <IconButton
          sx={{ color: theme.smnk[1000] }}
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <Badge color="error" variant="dot">
            {true ? <NotificationsActiveIcon /> : <NotificationsIcon />}
          </Badge>
        </IconButton> */}

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
            <InfoAlert message="No notifications" />
          </Box>
        </Drawer>
      </>
    </SmnkErrorBoundary>
  );
}

export default HomeNotification;
