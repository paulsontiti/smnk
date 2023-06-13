import { Box, Grid } from "@mui/material";
import DashBoardAppBar from "../appBar/DashBoardAppBar";
import AdsStepper from "../stepper/AdsStepper";
import DashBoardSpeedDial from "../speedDial/DashBoardSpeedDial";

export default function Layout(props: { children: any }) {
  return (
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
  );
}
