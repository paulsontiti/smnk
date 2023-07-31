import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Grid,
  Typography,
  Container,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/router";
import InfoAlert from "@/components/alerts/Info";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function BankDetails() {
  const router = useRouter();

  const { bankDetails } = useSelector(
    (state: RootState) => state.swExtra.swExtra
  );
  if (!bankDetails)
    return (
      <InfoAlert message="No Bank Details. Please add your bank details" />
    );

  return (
    <SmnkErrorBoundary>
      <Container
        sx={{
          p: {
            xs: "1rem",
            sm: "2rem 10rem",
            md: "2rem 15rem",
            lg: "2rem 20rem",
          },
        }}
      >
        <Card>
          <CardHeader title="Bank Details" />
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Account Name: </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption">
                  {bankDetails.accountName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Account Number: </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption">
                  {bankDetails.accountNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Bank Name: </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption">
                  {bankDetails.bankName}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                router.push(`/sw-dashboard/bank-details/edit-bank-details`);
              }}
            >
              Edit Bank Details
            </Button>
          </CardActions>
        </Card>
      </Container>
    </SmnkErrorBoundary>
  );
}
