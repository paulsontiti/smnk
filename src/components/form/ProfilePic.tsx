import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePicUploader from "./ProfilePicUploader";
import axios from "axios";
import { Skeleton } from "@mui/material";

export default function ProfilePic() {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [dp, setDp] = useState("");

  const handleDpUpdate = (dps: string) => {
    setDp(dps);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}/api/multer/profile-pic/${_id}`,
        });
        const data = await res.data;
        setDp(data)
      } catch (err: any) {
        console.log(err);
        return false;
      }
    })();
  }, [_id]);
  
  
  return (
        <Stack direction="row" spacing={2} sx={{margin:'2rem'}}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <ProfilePicUploader
                updateDp={(dp) => {
                  handleDpUpdate(dp);
                }}
              />
            }
          >
            {
              dp ? <Avatar
              alt=""
              src={`/uploads/images/dp/${dp}`}
              sx={{ width: 50, height: 50 }}
            /> : <Skeleton variant="circular" animation='wave' width={50} height={50} />
            }
            
          </Badge>
        </Stack>
  );
}
