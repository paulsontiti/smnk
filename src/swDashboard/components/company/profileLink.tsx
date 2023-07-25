import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getCompanyProfile } from "@/lib/utils/user";
import { ListItemIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { theme } from "@/pages/_app";

export default function CompanyProfileLink() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.users);
  const { data, error } = useSWR("getCompProfile", getCompanyProfile(user._id));

  if (error) return <p>Error occurred</p>;
  if (!data)
    return (
      <ListItemButton
        sx={{ ml: 8 }}
        onClick={() => {
          router.push("/dashboard/company/add-company-profile");
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
      sx={{ ml: 8 }}
      onClick={() => {
        router.push(`/dashboard/company`);
      }}
    >
      <ListItemIcon>
        <InfoIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="caption">Info</Typography>} />
    </ListItemButton>
  );
}
