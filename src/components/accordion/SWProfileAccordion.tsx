import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import React from "react";
import UserProfileContent from "../dialog/contents/UserProfileContent";

  
  function SWProfileAccordion({
sw  }: {
   sw:any
  }) {


    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
       
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Profile
                </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <UserProfileContent userId={sw._id}/>
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default SWProfileAccordion;
  