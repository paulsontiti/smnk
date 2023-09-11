import TransferForUpgradePaymentForm from "./TransferForUpgradePaymentForm";
import { Container } from "@mui/material";

export default function PaymentForUpgrade({
  packageName,
}: {
  packageName: string;
}) {
  return (
    <Container
      sx={{
        minWidth: "100%",
        p: { xs: "1rem", md: "2rem 15rem", lg: "2rem 20rem", xl: "2rem 25rem" },
      }}
    >
      <TransferForUpgradePaymentForm packageName={packageName} />
    </Container>
  );
}
