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
import { SmnkErrorBoundary } from "@/pages/_app";

function ProposalsAccordion({
  proposals,
  jobId,
}: {
  proposals: any;
  jobId: string;
}) {
  if (!jobId || !proposals) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Badge badgeContent={proposals.length} color="primary">
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Proposals
            </Typography>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {Array.isArray(proposals) &&
            proposals.map((pro: any, i: number) => (
              <ClientProposalDetailsAccordion
                key={i}
                proposal={pro}
                jobId={jobId}
              />
            ))}
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}

export default ProposalsAccordion;
