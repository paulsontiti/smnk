import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUserProfile } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import ProfilePic from "../avatar/ProfilePic";
import { useTheme } from "@mui/material/styles";
import { SmnkErrorBoundary } from "@/pages/_app";
import { VerifiedUserName } from "../card/SWDetailsNoCollapse";

export default function DP() {
  const {
    users: {
      user: { _id, type, typeClass },
    },
    swExtra: {
      swExtra: { level },
    },
  } = useSelector((state: RootState) => state);
  const theme = useTheme();
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      if (_id) {
        const { data } = await getUserProfile(_id);
        if (data) {
          if (typeClass) {
            if (typeClass === "individual") {
              setName(data.firstName + " " + data.lastName);
            } else {
              setName(data.name);
            }
          }
        }
      }
    })();
  }, [_id, typeClass]);
  return (
    <SmnkErrorBoundary>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: 250,
        }}
      >
        <ProfilePic />
        <br />

        {type !== "admin" && (
          <>
            {name && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <VerifiedUserName name={name} userId={_id} />
                <Typography variant="caption" color="primary">
                  {`${type}/${typeClass}`}
                </Typography>
              </Box>
            )}

            {/* <UserRating type={type} /> */}
          </>
        )}
      </Box>
    </SmnkErrorBoundary>
  );
}
