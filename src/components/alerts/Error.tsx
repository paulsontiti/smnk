
import { Alert, Box } from "@mui/material";
import React from "react";

function ErrorAlert({ message }: { message: string }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Alert severity="error">{message}!</Alert>
    </Box>
  );
}
export default ErrorAlert;
