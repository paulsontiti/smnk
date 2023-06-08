import * as React from "react";
import { IconButton, Drawer } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuItem from "./navbarMenu";

export default function NavbarDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2,color:'yellow'}}
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
        <NavbarMenuItem />
      </Drawer>
    </div>
  );
}
