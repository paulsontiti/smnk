import { Alert, Box } from "@mui/material";
import React from "react";

function ErrorAlert({ message }: { message?: string }) {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={'5rem'}>
      <Alert severity="error">
        {message
          ? message
          : "An Error occurred while feching data. Ensure you are connected to the internet and try again or refresh the page"}
        !
      </Alert>
    </Box>
  );
}
export default ErrorAlert;
