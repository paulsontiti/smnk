import { Box } from "@mui/material";
import React from "react";
import Logout from "./logout";
import Notification from "./Notification";

function DashboardHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Notification />
      <Logout />
    </Box>
  );
}

export default DashboardHeader;
