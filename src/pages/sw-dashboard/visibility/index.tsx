import { Bronze } from "../../../swDashboard/components/visibility/bronze";
import { Gold } from "@/swDashboard/components/visibility/gold";
import { Platinium } from "@/swDashboard/components/visibility/platinium";
import Layout from "@/components/dashboard/layout";
import { Card, CardHeader, CardContent, Container, Grid } from "@mui/material";

export default function VisibilityPage() {
  return (
    <Layout>
      <Container>
        <CardHeader title="Upgrade Your Package" />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={4} md={4}>
              {" "}
              <Platinium />
            </Grid>{" "}
            <Grid item xs={12} sm={4} md={4}>
              {" "}
              <Gold />
            </Grid>{" "}
            <Grid item xs={12} sm={4} md={4}>
              {" "}
              <Bronze />
            </Grid>
          </Grid>
        </CardContent>
      </Container>
    </Layout>
  );
}
