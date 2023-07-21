import * as React from "react";
import { Box } from "@mui/material";
import SearchDrawer from "../drawer/SearchDrawer";

export default function ClientSearchBox() {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <SearchDrawer searchOption="Services" />
      </Box>
    </>
  );
}
