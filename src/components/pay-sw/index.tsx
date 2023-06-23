import { Grid, Typography } from "@mui/material";
import InfoAlert from "../alerts/Info";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorAlert from "../alerts/Error";

function UserBankDetails({ userId }: { userId: string }) {
  const [bankDetails, setBankDetails] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${process.env.SMNK_URL}api/users/swExtra/bank-details/${userId}`,
        });
        const data = await res.data;
        setBankDetails(data);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [userId]);

  if (error) return <ErrorAlert />;

  if (!bankDetails) return <InfoAlert message="No Bank details" />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="caption">{bankDetails.bankName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">{bankDetails.accountName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">{bankDetails.accountNumber}</Typography>
      </Grid>
    </Grid>
  );
}

export default UserBankDetails;
