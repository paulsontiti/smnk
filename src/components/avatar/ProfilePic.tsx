import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from '@mui/material/Skeleton'
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePicUploader from "./ProfilePicUploader";

export default function ProfilePic({pic}:{pic:string}) {
  const { dpFileName } = useSelector((state: RootState) => state.users.user);


  
 
  return (
        <Stack direction="row" spacing={2} sx={{margin:'2rem'}}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <ProfilePicUploader

              />
            }
          >
{
  dpFileName ?             <Avatar
  alt=""
  src={`/api/multer/profile-pic/${dpFileName}`}
  sx={{ width: 50, height: 50 }}
/> :
<Skeleton variant="circular" width={50} height={50} />

}
          </Badge>
        </Stack>
  );
}
