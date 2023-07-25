import { RootState } from "@/store";
import { Chip } from "@mui/material";
import {
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";

function VisibilityLink() {
  const router = useRouter();
  const { subscription } = useSelector(
    (state: RootState) => state.swExtra.swExtra
  );
  const theme = useTheme();

  if (!subscription)
    return (
      <ListItemButton
        sx={{ ml: 4 }}
        onClick={() => {
          router.push("/sw-dashboard/visibility");
        }}
      >
        {" "}
        <ListItemIcon>
          <VisibilityIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2">Upgrade Subscription</Typography>
          }
        />
        <Chip
          color="primary"
          size="small"
          sx={{
            fontSize: ".6rem",
            position: "absolute",
            top: -7,
            ml: 18,
          }}
          label="
          Recommended"
        />
      </ListItemButton>
    );
  return (
    <ListItemButton
      sx={{ ml: 4 }}
      onClick={() => {
        router.push("/sw-dashboard/visibility");
      }}
    >
      <ListItemIcon>
        <VisibilityIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">Subscription</Typography>}
      />
      <Chip
        color="primary"
        sx={{
          fontSize: ".6rem",
          position: "absolute",
          top: -8,
          ml: 15,
        }}
        label={subscription.type}
        size="small"
      />
    </ListItemButton>
  );
}

export default VisibilityLink;
