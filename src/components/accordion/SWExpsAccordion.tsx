import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import React from "react";
import { Badge } from "@mui/material";
import SWExpAccordion from "./SWExpAccordion";
  
  function SWExpsAccordion({
   exps
  }: {
   exps:any[]
  }) {


    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Badge
                badgeContent={exps.length} color="primary"
                  
              >
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Experiences
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {
            exps.map((exp:any,i:number)=>(
               <SWExpAccordion exp={exp} key={i}/>
            ))
          }
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default SWExpsAccordion;
  