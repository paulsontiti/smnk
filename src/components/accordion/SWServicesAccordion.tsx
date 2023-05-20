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
import SWServiceDetailsAccordion from "./SWServiceDetailsAccordion";
  
  function SWServicesAccordion({
   services
  }: {
    services:any[]
  }) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Badge
                badgeContent={services.length} color="primary"
                  
              >
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Services
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {
            services.map((service:any,i:number)=>(
               <SWServiceDetailsAccordion service={service} key={i}/>
            ))
          }
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default SWServicesAccordion;
  