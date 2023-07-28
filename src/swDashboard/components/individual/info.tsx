import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserProfile } from "@/lib/utils/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListItemIcon, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "@/pages/_app";

export default function UserInfoLink() {
  const router = useRouter();

  const { _id } = useSelector((state: RootState) => state.users.user);
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await getUserProfile(_id);
      setData(res.data);
    })();
  }, [_id]);
  if (!data)
    return (
      <ListItemButton
        sx={{ ml: 0 }}
        onClick={() => {
          router.push("/dashboard/individual/add-personal-info");
        }}
      >
        <ListItemIcon>
          <InfoIcon sx={{ color: theme.smnk[1000] }} />
        </ListItemIcon>
        <ListItemText
          primary={<Typography variant="caption">Add Info</Typography>}
        />
      </ListItemButton>
    );
  return (
    <ListItemButton
      sx={{ ml: 0 }}
      onClick={() => {
        router.push(`/dashboard/individual`);
      }}
    >
      <ListItemIcon>
        <InfoIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="caption">Info</Typography>} />
    </ListItemButton>
  );
}
