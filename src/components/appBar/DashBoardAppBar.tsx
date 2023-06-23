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
          bgcolor: "#04023B",
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
              <Box
                bgcolor={theme.smnk[1200]}
                color={theme.smnk[300]}
                minHeight={"100vh"}
              >
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
            <Image
              alt="SMNK Nig Ltd"
              src="/assets/smnk.png"
              width={50}
              height={50}
              style={{ borderRadius: "50%", marginRight: ".5rem" }}
              onClick={() => {
                router.push("/");
              }}
            />
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
            <Notification />
          </Grid>
        </Grid>
      </Toolbar>
    </>
  );
}
