import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function MsgForClientORTalent({src,msg,title}:{src:string,title:string,msg:string}) {
  return (
    <Box position={"relative"}>
    <Box
      component="img"
      sx={{
        height: 250,
        display: "block",
        maxWidth: 400,
        minWidth: "100%",
        overflow: "hidden",
        width: "100%",
      }}
      m="1rem 0"
      src={src}
      alt="Message for client"
    />
    <Box
      position={"absolute"}
      top={0}
      sx={{ opacity: "0.5", overflow: "hidden" }}
      bgcolor={"black"}
      color={"white"}
      p=".1rem 1rem"
      height={250}
      minWidth={"100%"}
      maxHeight={250}

    >
      <Typography variant="body2" fontWeight={'bold'}>
        {title}
      </Typography>
      <Typography variant="caption">
        {msg}
      </Typography>
    </Box>
  </Box>
      
  );
}

export default MsgForClientORTalent;
