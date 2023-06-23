import {
  Box,
    Typography,
  } from "@mui/material";
  import React from "react";
import UserProfileContent from "../dialog/contents/UserProfileContent";

  
  function SWProfileAccordion({
userId  }: {
  userId:string
  }) {


    return (
      <Box>
        <Typography  variant="subtitle1">Profile:</Typography>
        <UserProfileContent userId={userId}/>
      </Box>
  
    );
  }
  
  export default SWProfileAccordion;
  