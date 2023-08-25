import * as React from "react";
import { IconButton, Drawer, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuItem from "./navbarMenu";
import LoginButton from "./loginButton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { theme } from "@/pages/_app";
import CancelFloatingActionButtons from "@/components/fab/Cancel";
export default function NavbarDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { _id } = useSelector((state: RootState) => state.users.user);
  return (
    <div>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2, color: theme.smnk[1000] }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        sx={{
          maxWidth: "50vw",
          padding: ".5rem",
        }}
      >
        <Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {!_id && <LoginButton label="Login" variant="contained" />}

            <IconButton
              onClick={() => {
                setOpenDrawer(!openDrawer);
              }}
              sx={{ color: theme.smnk[1000] }}
            >
              <CancelFloatingActionButtons handleClick={() => {}} />
            </IconButton>
          </Box>
          {/* <MenuBarLogo /> */}
          <NavbarMenuItem />
        </Box>
      </Drawer>
    </div>
  );
}
export function MenuBarLogo() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mb={3}
    >
      <Typography
        fontFamily={`'Bungee Shade', cursive`}
        fontWeight={"bold"}
        fontSize={"2rem"}
      >
        SMNK
      </Typography>
      <Typography fontFamily={`'Bungee Spice', cursive`} fontSize={".5rem"}>
        we connect,you collect
      </Typography>
    </Box>
  );
}
