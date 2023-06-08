import { Box, Grid } from "@mui/material";
import DP from "../../components/dashboard/dp";
import MenuDrawer from "../../swDashboard/components/account/menuDrawer";
import DashboardBreadcrumb from "../../swDashboard/components/breadcrumbs/dashboard";
import ADashboardMenu from "./ADashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function AdminLayout(props: { children: any }) {
  //console.log(info)
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MenuDrawer>
          <>
            <DashboardHeader />
            <ADashboardMenu />
          </>
        </MenuDrawer>
        <DashboardBreadcrumb />
      </Box>
      <Grid container>
        <Grid item xs={12} sx={{ marginTop: "1rem" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box>
                <DP />
                {props.children}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
