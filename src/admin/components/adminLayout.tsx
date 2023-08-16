import { Grid } from "@mui/material";
import ADashboardMenu from "./ADashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/pages/_app";

export default function AdminLayout(props: { children: any }) {
  //console.log(info)
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item md={2} sx={{ flexGrow: 1 }}>
          <ADashboardMenu />
        </Grid>
        <Grid item xs={10} sx={{ marginTop: "1rem", flexGrow: 1 }}>
          <DashboardHeader />
          {props.children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
