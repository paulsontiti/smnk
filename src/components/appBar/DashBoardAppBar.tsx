import { Grid, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuDrawer from "@/swDashboard/components/account/menuDrawer";
import CDashboardMenu from "@/c-dashboard/components/account/cDashboardMenu";
import SWDashboardMenu from "@/swDashboard/components/account/swDashboardMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ChatNotification from "../chat/ChatNotification";
import { useRouter } from "next/router";
import Notification from "../dashboard/Notification";
import DP from "../dashboard/dp";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { MenuBarLogo } from "../home/navbar/navBarDrawer";
import { AppBarLogo } from "./HomeLogoutAppBar";
import DashBoardNotification from "../dashboard/DashBoardNotification";

export default function DashBoardAppBar() {
  //retrive user from redux state
  const { user } = useSelector((state: RootState) => state.users);
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
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
            <MenuDrawer>
              <Box color={theme.smnk[1000]} minHeight={"100vh"}>
                <DP />

                {user && user.type === "client" ? (
                  <CDashboardMenu />
                ) : (
                  <SWDashboardMenu />
                )}
              </Box>
            </MenuDrawer>
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box pt={2}>
              <Image
                alt="SMNK Nig Ltd"
                src="/assets/smnk_logo.jpg"
                width={70}
                height={70}
                style={{ marginRight: ".5rem" }}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Box>
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
            <DashBoardNotification />
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}
