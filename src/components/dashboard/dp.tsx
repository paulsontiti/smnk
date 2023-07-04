import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserRating from "./UserRating";
import { getUserProfile } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import ProfilePic from "../avatar/ProfilePic";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
      const { data } = await getUserProfile(_id);
      if (data) {
        if (typeClass === "individual") {
          setName(data.firstName + " " + data.lastName);
        } else {
          setName(data.name);
        }
      }
    })();
  }, [_id, typeClass]);
  return (
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
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: theme.smnk[1000],
                  fontWeight: "bold",
                }}
                variant="subtitle1"
              >
                {name}
              </Typography>
              <Typography variant="caption" component="i" color="primary">
                {`(${type}/${typeClass})`}
              </Typography>
            </Box>
          )}

          <UserRating type={type} />
        </>
      )}
    </Box>
  );
}
