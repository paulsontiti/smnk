import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { User } from "@/lib/types/userInfo";
import UserRating from "../dashboard/UserRating";
import SWFullDetailsAccordion from "../dialog/contents/SWFullDetailsAccordion";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackAvatar } from "../avatar/DashboardDp";

export default function SWDetailsAccordion({ sw }: { sw: User }) {
  if (!sw) return <p></p>;
  return (
    <SmnkErrorBoundary>
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
            <BlackAvatar
              width={50}
              height={50}
              alt="Profile Pic"
              src={`/api/multer/profile-pic/${sw.dpFileName}`}
            />
            <UserRating type={sw.type} rating={1} level="Beginner" />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SWFullDetailsAccordion userId={sw._id} />
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}
