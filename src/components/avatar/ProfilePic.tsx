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
import Image from "next/image";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function ProfilePic() {
  const { dpFileName, type } = useSelector(
    (state: RootState) => state.users.user
  );
  const router = useRouter();
  const theme = useTheme();

  const [imgLoadComplete, setImgLoadComplete] = useState(false);
  return (
    <SmnkErrorBoundary>
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
              <Image
                onLoadingComplete={() => {
                  setImgLoadComplete(true);
                }}
                style={{
                  borderRadius: "50%",
                  display: imgLoadComplete ? "flex" : "none",
                }}
                width={80}
                height={80}
                alt="Profile picture"
                src={`/api/multer/profile-pic/${dpFileName}`}
              />
              {!imgLoadComplete && (
                <Skeleton
                  variant="circular"
                  width={80}
                  height={80}
                  animation="wave"
                />
              )}
            </IconButton>
          ) : (
            <IconButton>
              <Avatar sx={{ width: 80, height: 80 }} />
            </IconButton>
          )}
        </Badge>
      </Stack>
    </SmnkErrorBoundary>
  );
}
