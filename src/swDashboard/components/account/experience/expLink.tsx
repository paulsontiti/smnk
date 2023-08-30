import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { ListItemIcon, Typography, Box } from "@mui/material";
import { theme } from "@/pages/_app";
import { useEffect, useState } from "react";
import axios from "axios";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedIcon from "@mui/icons-material/Verified";
export default function ExpLink() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const router = useRouter();
  const [exp, setExp] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${process.env.SMNK_URL}api/users/swExtra/exp/${_id}`,
        });
        const data = await res.data;
        setExp(data);
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [_id]);

  if ((exp && exp?.length === 0) || !exp)
    return (
      <ListItemButton
        sx={{ ml: 0 }}
        onClick={() => {
          router.push("/sw-dashboard/experience/add-experience");
        }}
      >
        {" "}
        <ListItemIcon>
          <AddHomeWorkIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={<MenuLink label="Add Experience" pending={true} />}
        />
      </ListItemButton>
    );

  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => {
        router.push("/sw-dashboard/experience");
      }}
    >
      <ListItemIcon>
        <WorkHistoryIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText primary={<MenuLink label="Experience" pending={false} />} />
    </ListItemButton>
  );
}
export function MenuLink({
  label,
  pending,
}: {
  label: string;
  pending: boolean;
}) {
  return (
    <Box display={"flex"} alignItems={"flex-start"}>
      <Typography variant="caption">{label}</Typography>
      {pending ? (
        <PendingIcon sx={{ fontSize: 12 }} color="error" />
      ) : (
        <VerifiedIcon color="success" sx={{ fontSize: 12 }} />
      )}
    </Box>
  );
}
