import { Box, Grid, Typography } from "@mui/material";
import InfoAlert from "../alerts/Info";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorAlert from "../alerts/Error";
import { SmnkErrorBoundary } from "@/pages/_app";
import LoadingAlert from "../alerts/Loading";
import { BlackTypography } from "../card/ClientJobDetailsCard";

function UserBankDetails({ userId }: { userId: string }) {
  const [bankDetails, setBankDetails] = useState<any>(undefined);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
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
      }
    })();
  }, [userId]);
  if (error) return <ErrorAlert />;
  if (bankDetails === undefined) return <LoadingAlert />;
  if (bankDetails === null) return <InfoAlert message="No Bank details" />;
  return (
    <SmnkErrorBoundary>
      <Box width={"100%"}>
        <BlackTypography label="Bank Name" value={bankDetails.bankName} />
        <BlackTypography label="Account Name" value={bankDetails.accountName} />
        <BlackTypography
          label="Account Number"
          value={bankDetails.accountNumber}
        />
      </Box>
    </SmnkErrorBoundary>
  );
}

export default UserBankDetails;
