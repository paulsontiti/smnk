import TransferForJobPaymentForm from "./TransferForJobPaymentForm";
import { Box } from "@mui/material";

export default function PaymentForJob({ jobId }: { jobId: string }) {
  return (
    <Box sx={{ margin: "1rem" }} minWidth={"100%"}>
      <TransferForJobPaymentForm jobId={jobId} />
    </Box>
  );
}
