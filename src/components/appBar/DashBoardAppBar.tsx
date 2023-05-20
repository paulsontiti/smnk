import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuDrawer from "@/swDashboard/components/account/menuDrawer";
import DashboardHeader from "../dashboard/DashboardHeader";
import CDashboardMenu from "@/c-dashboard/components/account/cDashboardMenu";
import SWDashboardMenu from "@/swDashboard/components/account/swDashboardMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Logout from "../dashboard/logout";
import Notification from "../dashboard/Notification";
import MessageBox from "../message/MessageBox";

export default function DashBoardAppBar() {
  //retrive user from redux state
  const { user } = useSelector((state: RootState) => state.users);
  return (
    <Box sx={{ flexGrow: 1,marginBottom:'1rem' }}>
      <AppBar position="static" sx={{backgroundColor:'white'}}>
        <Toolbar sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <MenuDrawer>
            <>
             
              {user && user.type === "client" ? (
                <CDashboardMenu />
              ) : (
                <SWDashboardMenu />
              )}
            </>
          </MenuDrawer>
          <MessageBox/>
            <Notification/>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
