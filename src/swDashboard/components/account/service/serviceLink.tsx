import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import BusinessIcon from "@mui/icons-material/Business";
import { ListItemIcon, Typography } from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { theme } from "@/pages/_app";

export default function ServiceLink() {
  const router = useRouter();
  const { swExtra } = useSelector((state: RootState) => state.swExtra);
  if (!swExtra.services || (swExtra.services && swExtra.services.length < 1))
    return (
      <ListItemButton
        sx={{ ml: 0 }}
        onClick={() => {
          router.push("/sw-dashboard/service/add-service");
        }}
      >
        {" "}
        <ListItemIcon>
          <AddBusinessIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="caption">Add Services</Typography>}
        />
      </ListItemButton>
    );

  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => {
        router.push("/sw-dashboard/service");
      }}
    >
      <ListItemIcon>
        <BusinessIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="caption">Services</Typography>}
      />
    </ListItemButton>
  );
}
