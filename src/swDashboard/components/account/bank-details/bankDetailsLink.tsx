import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PaymentIcon from "@mui/icons-material/Payment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { ListItemIcon, Typography } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { theme } from "@/pages/_app";

export default function BankDetailsLink() {
  const router = useRouter();
  const { swExtra } = useSelector((state: RootState) => state.swExtra);

  if (!swExtra.bankDetails)
    return (
      <ListItemButton
        sx={{ ml: 2 }}
        onClick={() => {
          router.push("/sw-dashboard/bank-details/add-bank-details");
        }}
      >
        {" "}
        <ListItemIcon>
          <AddCardIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="caption">Add Bank Details</Typography>}
        />
      </ListItemButton>
    );

  return (
    <ListItemButton
      sx={{ ml: 2 }}
      onClick={() => {
        router.push("/sw-dashboard/bank-details");
      }}
    >
      {" "}
      <ListItemIcon>
        <PaymentIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="caption">Bank Details</Typography>}
      />
    </ListItemButton>
  );
}
