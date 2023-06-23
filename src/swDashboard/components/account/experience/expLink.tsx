import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { ListItemIcon, Typography } from "@mui/material";

export default function ExpLink() {
  const { swExtra } = useSelector((state: RootState) => state.swExtra);
  const router = useRouter();

  if (!swExtra.experience)
    return (
      <ListItemButton
        sx={{ ml: 2 }}
        onClick={() => {
          router.push("/sw-dashboard/experience/add-experience");
        }}
      >
        {" "}
        <ListItemIcon>
          <AddHomeWorkIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="caption">Add Experience</Typography>} />
      </ListItemButton>
    );

  return (
    <ListItemButton
      sx={{ ml: 2 }}
      onClick={() => {
        router.push("/sw-dashboard/experience");
      }}
    >
      <ListItemIcon>
        <WorkHistoryIcon sx={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="caption">Experience</Typography>} />
    </ListItemButton>
  );
}
