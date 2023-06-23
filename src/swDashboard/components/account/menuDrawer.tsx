import * as React from "react";
import { IconButton, Drawer, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutSwitch from "@/components/switch/LogoutSwitch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ThemeContainer from "@/components/theme/ThemeContainer";
import { useTheme } from "@mui/material/styles";
export default function MenuDrawer({ children }: { children: JSX.Element }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const theme = useTheme();
  const { _id } = useSelector((state: RootState) => state.users.user);
  return (
    <div>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        sx={{ color: theme.smnk[100] }}
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
        <ThemeContainer>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              onClick={() => {
                setOpenDrawer(!openDrawer);
              }}
              sx={{ color: theme.smnk[100] }}
            >
              <CloseIcon />
            </IconButton>
            {_id && <LogoutSwitch />}
          </Box>
          {children}
        </ThemeContainer>
      </Drawer>
    </div>
  );
}
