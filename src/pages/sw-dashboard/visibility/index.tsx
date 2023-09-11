import { Bronze } from "../../../swDashboard/components/visibility/bronze";
import { Gold } from "@/swDashboard/components/visibility/gold";
import { Platinium } from "@/swDashboard/components/visibility/platinium";
import Layout from "@/components/dashboard/layout";
import { Box, CardHeader, CardContent, Grid } from "@mui/material";

export default function VisibilityPage() {
  return (
    <Layout>
      <Box>
        <CardHeader title="Upgrade Your Package" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={5}>
              {" "}
              <Gold />
            </Grid>{" "}
            <Grid item xs={12} sm={4} md={4}>
              {" "}
              <Platinium />
            </Grid>{" "}
            <Grid item xs={12} sm={3} md={3}>
              {" "}
              <Bronze />
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Layout>
  );
}
