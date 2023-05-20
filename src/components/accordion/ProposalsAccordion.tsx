import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import React from "react";
import ClientProposalDetailsAccordion from "./ClientProposalDetailsAccordion";
import { Badge } from "@mui/material";
  
  function ProposalsAccordion({
    proposals,jobId
  }: {
    proposals:any,jobId:string
  }) {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Badge
                badgeContent={proposals.length} color="primary"
                  
              >
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Proposals
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {
            proposals.map((pro:any,i:number)=>(
                <ClientProposalDetailsAccordion key={i} proposal={pro} jobId={jobId}/>
            ))
          }
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default ProposalsAccordion;
  