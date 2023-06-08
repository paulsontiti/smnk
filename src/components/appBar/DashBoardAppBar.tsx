import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuDrawer from "@/swDashboard/components/account/menuDrawer";
import CDashboardMenu from "@/c-dashboard/components/account/cDashboardMenu";
import SWDashboardMenu from "@/swDashboard/components/account/swDashboardMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ChatNotification from "../chat/ChatNotification";
import LogoutSwitch from "../switch/LogoutSwitch";
import ThemeContainer from "../theme/ThemeContainer";

export default function DashBoardAppBar() {
  //retrive user from redux state
  const { user } = useSelector((state: RootState) => state.users);

  return (
    <ThemeContainer
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <MenuDrawer color="white">
              <>
                {user && user.type === "client" ? (
                  <CDashboardMenu />
                ) : (
                  <SWDashboardMenu />
                )}
              </>
            </MenuDrawer>
          </Grid>
          <Grid
            item
            xs={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h6" component="div">
              SMNK
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <ChatNotification />
          </Grid>
          <Grid
            item
            xs={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
           <LogoutSwitch/>
          </Grid>
        </Grid>
      </Toolbar>
    </ThemeContainer>
  );
}
