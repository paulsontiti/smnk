import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfilePicUploader from "./ProfilePicUploader";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";

export default function ProfilePic() {
  const { dpFileName, type } = useSelector(
    (state: RootState) => state.users.user
  );
  const router = useRouter();
  const theme = useTheme();

  return (
    <Stack direction="row">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<ProfilePicUploader />}
      >
        {dpFileName ? (
          <IconButton
            sx={{ mt: 1, mr: 2 }}
            onClick={() => {
              if (type === "skilled worker") {
                router.push("/sw-dashboard");
              } else {
                router.push("/c-dashboard");
              }
            }}
          >
            <Avatar
              alt=""
              src={`/api/multer/profile-pic/${dpFileName}`}
              sx={{ width: 80, height: 80 }}
            />
          </IconButton>
        ) : (
          <IconButton>
            <Skeleton variant="circular" width={80} height={80} />
          </IconButton>
        )}
      </Badge>
    </Stack>
  );
}
