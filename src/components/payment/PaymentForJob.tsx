import { useState } from "react";
import TransferForJobPaymentForm from "./TransferForJobPaymentForm";
import { Box } from "@mui/material";

export default function PaymentForJob({ jobId }: { jobId: string }) {
  return (
    <Box sx={{ margin: "1rem" }}>
      <TransferForJobPaymentForm jobId={jobId} />
    </Box>
  );
}
