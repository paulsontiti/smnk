import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuDrawer from "@/swDashboard/components/account/menuDrawer";
import CDashboardMenu from "@/c-dashboard/components/account/cDashboardMenu";
import SWDashboardMenu from "@/swDashboard/components/account/swDashboardMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ChatNotification from "../chat/ChatNotification";
import { useRouter } from "next/router";
import Notification from "../dashboard/Notification";
import LogoutSwitch from "../switch/LogoutSwitch";
import ThemeContainer from "../theme/ThemeContainer";

export default function DashBoardAppBar() {
  //retrive user from redux state
  const { user } = useSelector((state: RootState) => state.users);
const router = useRouter()
  return (
    <
    >
      
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor:'#04023B'
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
            <MenuDrawer>
            <ThemeContainer>
            {user && user.type === "client" ? (
                  <CDashboardMenu />
                ) : (
                  <SWDashboardMenu />
                )}
                 {user._id &&   <LogoutSwitch/>}
            </ThemeContainer>
             
            </MenuDrawer>
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h6" color={'white'} component="div" onClick={()=>{
              router.push('/')
            }}>
              SMNK
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ChatNotification />
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
        <Notification/>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}
