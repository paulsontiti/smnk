import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useRef } from "react";
import { User } from "@/lib/types/userInfo";
import DPAvatar from "../avatar/DPAvatar";
import UserRating from "../dashboard/UserRating";
import SWFullDetailsAccordion from "../dialog/contents/SWFullDetailsAccordion";

export default function SWDetailsAccordion({ sw }: { sw: User }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <DPAvatar dp={sw.dpFileName} />
          <UserRating type={sw.type} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <SWFullDetailsAccordion userId={sw._id} />
      </AccordionDetails>
    </Accordion>
  );
}
