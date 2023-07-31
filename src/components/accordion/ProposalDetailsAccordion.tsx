import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, Box, CardActions } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import GppBadIcon from "@mui/icons-material/GppBad";
import EditDeleteBottomNavigation from "../bottomNavigation/EditDeleteBottomNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function ProposalDetailsAccordion({ jobId }: { jobId: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [proposal, setProposal] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      if (jobId && _id) {
        try {
          const res = await axios({
            method: "POST",
            url: `${process.env.SMNK_URL}api/users/proposal/proposal-by-userId-jobId`,
            data: { jobId, userId: _id },
          });
          const data = await res.data;
          setProposal(data);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [jobId, _id]);

  if (!proposal) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion sx={{ margin: "1rem 0.1rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Badge
            badgeContent={
              proposal && proposal.accepted ? (
                <VerifiedIcon color="success" />
              ) : proposal && proposal.rejected ? (
                <GppBadIcon color="error" />
              ) : (
                <PendingIcon color="error" />
              )
            }
          >
            <Typography variant="caption">proposal</Typography>
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          <Box>{proposal.content}</Box>

          {/* <CardActions>
          {proposal && !proposal.rejected && !proposal.accepted && (
            <EditDeleteBottomNavigation
              editHandleClick={() => {}}
              deleteHandleClick={() => {}}
            />
          )}
        </CardActions> */}
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
