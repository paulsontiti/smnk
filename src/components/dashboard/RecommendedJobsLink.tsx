import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import axios from "axios";
import { ListItemIcon, Typography } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import { theme } from "@/pages/_app";

function RecommendedJobsLink() {
  const { user } = useSelector((state: RootState) => state.users);

  const router = useRouter();

  const [isOnAJob, setIsOnAJob] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (user._id) {
          const res = await axios({
            method: "POST",
            url: `${process.env.SMNK_URL}api/users/proposal/jobs/is-sw-on-a-job`,
            data: { userId: user._id },
          });
          const data = await res.data;
          setIsOnAJob(data);
        }
      } catch (err: any) {
        console.log(err);
        return err;
      }
    })();
  }, [user._id]);
  return (
    <ListItemButton
      disabled={isOnAJob}
      sx={{ ml: 0 }}
      onClick={() => {
        router.push("/dashboard/job/recommended-jobs");
      }}
    >
      <ListItemIcon>
        <RecommendIcon sx={{ color: theme.smnk[1000] }} />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">Recommended Jobs</Typography>}
      />
    </ListItemButton>
  );
}

export default RecommendedJobsLink;
