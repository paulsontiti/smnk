import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box,Typography } from "@mui/material";
import moment from "moment";

export default function AdminComplaintAccordion({
  complaint
}: {
    complaint: any
}) {

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
            <>
            <Typography variant="caption" component="span">
            {complaint.subject}
          </Typography><Typography variant="caption" component="span">
            {moment(complaint.date).format("DD/MM/YY")}
          </Typography>
            {/* {complaint.correction.read ? <MarkChatReadIcon color="success"/> : <MarkChatUnreadIcon color="warning"/>} */}
            </>
        
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box>{complaint.complaint}</Box>

       
      </AccordionDetails>
    </Accordion>
  );
}
