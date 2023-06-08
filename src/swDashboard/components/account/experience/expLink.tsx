import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { ListItemIcon } from "@mui/material";

export default function ExpLink() {
  const { user } = useSelector((state: RootState) => state.users);

  const router = useRouter();

  if (user.experience.length < 1)
    return (
      <ListItemButton
        sx={{ ml: 8 }}
        onClick={() => {
          router.push("/sw-dashboard/experience/add-experience");
        }}
      >
        {" "}
        <ListItemIcon>
          <AddHomeWorkIcon sx={{ color: "yellow" }} />
        </ListItemIcon>
        <ListItemText primary={"Add Experience"} />
      </ListItemButton>
    );

  return (
    <ListItemButton
      sx={{ ml: 8 }}
      onClick={() => {
        router.push("/sw-dashboard/experience");
      }}
    >
      <ListItemIcon>
        <WorkHistoryIcon sx={{ color: "yellow" }} />
      </ListItemIcon>
      <ListItemText primary={"Experience"} />
    </ListItemButton>
  );
}
