import { Box } from "@mui/material";
import React from "react";
import ChatNotification from "../chat/ChatNotification";

function DashboardHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <ChatNotification url="/a-dashboard/chat" />
    </Box>
  );
}

export default DashboardHeader;
