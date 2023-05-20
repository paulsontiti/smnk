import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge } from "@mui/material";
import SWReportDetailsAccordion from "./SWReportDetails";
import AddFloatingActionButtons from "../fab/Add";
import { useRouter } from "next/router";
  
  function SWReportsAccordion({
    reports,jobId
  }: {
    reports:any[],jobId:string
  }) {
    
    const router = useRouter()
    const unreadReports = reports.filter((r)=>r.read === false)
    return (
      <Accordion sx={{maxWidth:'100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Badge
                badgeContent={unreadReports.length} color="primary"
                  
              >
                <Typography variant="caption" sx={{fontWeight:'bold'}} >
                  Reports
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
          {
            reports.length > 0 && reports.map((report:any,i:number)=>(
                <SWReportDetailsAccordion key={i} report={report} jobId={jobId}/>
            )) 
          }
          <AddFloatingActionButtons handleClick={()=>{
            router.push(`/report/${jobId}`)
          }}/>
        </AccordionDetails>
      </Accordion>
    );
  }
  
  export default SWReportsAccordion;
  