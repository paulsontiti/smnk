import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
import { useRouter } from "next/router";
import AdminComplaintAccordion from "./AdminComplaintAccordion";
  
  function AdminCompliantsAccordion({
    complaints
  }: {
    complaints:any[]
  }) {
    
    const router = useRouter()
    const unreadComplaints = complaints.filter((r)=>r.read === false)
    return (
      <Accordion sx={{maxWidth:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Badge
                badgeContent={unreadComplaints.length} color="primary"
                  
              >
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Complaints
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {
           complaints.map((complaint:any,i)=>(
                <AdminComplaintAccordion key={i} complaint={complaint}/>
            )) 
          }
         
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default AdminCompliantsAccordion;
  