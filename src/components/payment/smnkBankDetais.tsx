import { CardHeader, Box } from "@mui/material";
import { BlackTypography } from "../card/ClientJobDetailsCard";

export default function SMNKBankDetails() {
  return (
    <Box mb={5} minWidth={"100%"}>
      <CardHeader subheader="SMNK Bank Details" />
      <BlackTypography label="Account Name" value=" Smnk Limited" />
      <BlackTypography label="Account Number" value="0668504701" />
      <BlackTypography label="Bank Name" value="GTB Bank" />
    </Box>
  );
}
