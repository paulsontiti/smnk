import { Grid, Typography, Card, CardContent, CardHeader } from "@mui/material";

export default function SMNKBankDetails() {
  return (
    <Card sx={{ mb: 5 }}>
      <CardContent>
        <CardHeader subheader="SMNK Bank Details" />
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2">Account Name: </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginBottom: 3 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Smnk Nigeria Limited
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Account Number: </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginBottom: 3 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              09236457218
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Bank Name: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Access Bank
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
