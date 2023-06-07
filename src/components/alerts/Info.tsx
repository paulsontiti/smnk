import { Alert,Box } from "@mui/material";
import React from "react";
function InfoAlert({ message }: { message: string }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
    <Alert severity="info">{message}!</Alert>
  </Box>
  )
}

export default InfoAlert;
