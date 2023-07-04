import { Box, Grid, ThemeProvider } from "@mui/material";
import DashBoardAppBar from "../appBar/DashBoardAppBar";
import AdsStepper from "../stepper/AdsStepper";
import DashBoardSpeedDial from "../speedDial/DashBoardSpeedDial";
import { theme } from "@/pages/_app";
import Head from "next/head";

export default function Layout(props: { children: any }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <Box>
        <DashBoardAppBar />
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Box position={"relative"}>
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
