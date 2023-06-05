
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Badge, Box, CardActions} from '@mui/material';
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import GppBadIcon from '@mui/icons-material/GppBad';
import EditDeleteBottomNavigation from '../bottomNavigation/EditDeleteBottomNavigation';
import ApplyBottomNavigation from '../bottomNavigation/ApplyBottomNavigation';

export default function ProposalDetailsAccordion({proposal,jobId}:{proposal:any,jobId:string}) {

if(!proposal) return <p></p>


  return (
    
      <Accordion sx={{margin:'1rem 0.1rem'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
       <Badge
                badgeContent={
                  proposal && proposal.accepted ? <VerifiedIcon color="success"/> : (proposal && proposal.rejected ? <GppBadIcon  color="error"/> : <PendingIcon color="error" />)
                }
              >
                <Typography variant="caption" >
                  proposal
                </Typography>
              </Badge>
        </AccordionSummary>
        <AccordionDetails>
            <Box>
                {proposal.content}
              
            </Box>
       
        <CardActions>
     {
      proposal && !proposal.rejected && !proposal.accepted ?  <EditDeleteBottomNavigation/> : <ApplyBottomNavigation jobId={jobId}/>
     }
        </CardActions>
        </AccordionDetails>
      </Accordion>
     
  );
}