import { Box, Typography } from "@mui/material";
import React from "react";
import UserProfileContent from "../dialog/contents/UserProfileContent";
import { SmnkErrorBoundary } from "@/pages/_app";

function SWProfileAccordion({ userId }: { userId: string }) {
  if (!userId) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box>
        <Typography variant="subtitle1">Profile:</Typography>
        <UserProfileContent userId={userId} />
      </Box>
    </SmnkErrorBoundary>
  );
}

export default SWProfileAccordion;
