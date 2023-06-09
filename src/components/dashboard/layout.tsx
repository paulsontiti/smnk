import { Box, Grid, ThemeProvider } from "@mui/material";
import DashBoardAppBar from "../appBar/DashBoardAppBar";
import AdsStepper from "../stepper/AdsStepper";
import DashBoardSpeedDial from "../speedDial/DashBoardSpeedDial";
import { theme } from "@/pages/_app";
import Head from "next/head";
import DP from "./dp";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CDashboardMenu from "@/c-dashboard/components/account/cDashboardMenu";
import SWDashboardMenu from "@/swDashboard/components/account/swDashboardMenu";
import { useTheme, useMediaQuery } from "@mui/material";
import DesktopDashboardAppBar from "../appBar/DesktopDashboardAppBar";

export default function Layout(props: { children: any }) {
  const { user } = useSelector((state: RootState) => state.users);
  const newTheme = useTheme();
  const mediaQuery = useMediaQuery(newTheme.breakpoints.up("md"));
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Box>
        {mediaQuery ? <DesktopDashboardAppBar /> : <DashBoardAppBar />}
        <Grid container>
          {mediaQuery && (
            <Grid item xs={12} md={4}>
              <Box
                color={theme.smnk[1000]}
                minHeight={"100vh"}
                maxWidth={300}
                bgcolor={"whitesmoke"}
              >
                <DP />

                {user && user.type === "client" ? (
                  <CDashboardMenu />
                ) : (
                  <SWDashboardMenu />
                )}
              </Box>
            </Grid>
          )}{" "}
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  p={2}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  {props.children ? props.children : <AdsStepper />}
                </Box>
              </Grid>
              {/* <Grid item xs={12}>
                          
                        </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        <DashBoardSpeedDial />
      </Box>
    </ThemeProvider>
  );
}
