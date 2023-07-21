import * as React from "react";
import { IconButton } from "@mui/material";
import Fab from "@mui/material/Fab";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

export default function BackToChatRoomFloatingActionButtons() {
  const router = useRouter();
  return (
    <IconButton
      onClick={() => {
        router.back();
      }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
    >
      <Fab color="primary" aria-label="add" size="small">
        <ArrowBackIcon />
      </Fab>
    </IconButton>
  );
}
