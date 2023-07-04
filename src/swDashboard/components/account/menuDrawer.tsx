import * as React from "react";
import { IconButton, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeContainer from "@/components/theme/ThemeContainer";
import { useTheme } from "@mui/material/styles";
import CancelFloatingActionButtons from "@/components/fab/Cancel";
import { useRouter } from "next/router";

export default function MenuDrawer({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const openDrawerForDashboardOnly =
    router.pathname === "/sw-dashboard" || router.pathname === "/c-dashboard";
  const [openDrawer, setOpenDrawer] = React.useState(
    openDrawerForDashboardOnly ? true : false
  );
  const theme = useTheme();
  return (
    <div>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        sx={{ color: theme.smnk[1000] }}
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
        <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
          <IconButton onClick={() => {}} sx={{ color: theme.smnk[100] }}>
            <CancelFloatingActionButtons
              handleClick={() => {
                setOpenDrawer(!openDrawer);
              }}
            />
          </IconButton>
        </Box>
        {children}
      </Drawer>
    </div>
  );
}
