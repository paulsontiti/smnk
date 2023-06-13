import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from '@mui/material/Skeleton'
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePicUploader from "./ProfilePicUploader";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

export default function ProfilePic() {
  const { dpFileName } = useSelector((state: RootState) => state.users.user);
const router = useRouter()

  
 
  return (
        <Stack direction="row">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <ProfilePicUploader

              />
            }
          >
{
  dpFileName ? <IconButton onClick={()=>{
    router.push('/sw-dashboard')
  }}>
     <Avatar
  alt=""
  src={`/api/multer/profile-pic/${dpFileName}`}
  sx={{ width: 80, height: 80,mt:2}}
/>
  </IconButton> :
<Skeleton variant="circular" width={80} height={80} sx={{mt:2}}/>

}
          </Badge>
        </Stack>
  );
}
