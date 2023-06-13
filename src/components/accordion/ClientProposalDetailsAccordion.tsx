import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, CardActions, IconButton, Typography } from "@mui/material";
import { getUser } from "@/lib/user";
import { useEffect, useRef, useState } from "react";
import { User } from "@/lib/types/userInfo";
import DPAvatar from "../avatar/DPAvatar";
import UserRating from "../dashboard/UserRating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { acceptProposal, rejectProposal } from "@/lib/proposal";
import { useRouter } from "next/router";
import { downloadReport } from "./ClientReportDetails";
import DownloadFileBottomNavigation from "../bottomNavigation/DownloadFileBottomNavigation";
import ProposalActionsBottomNavigation from "../bottomNavigation/ProposalActionsBottomNavigation";
import GenericDialog from "../dialog/GenericDialog";
import SWFullDetailsAccordion from "../dialog/contents/SWFullDetailsAccordion";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";


export default function ClientProposalDetailsAccordion({
  proposal,
  jobId,
}: {
  proposal: any;
  jobId: string;
}) {
  const router = useRouter();
  const [sw, setSw] = useState<User>({} as User);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
   //declare refs
   const snackBarRef = useRef();
  const swDetailsRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await getUser(proposal.userId);
      setSw(user);
    })();
  }, [proposal.userId]);

  if (!proposal) return <p></p>

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
          <UserRating rating={sw.rating} level={sw.level} type={sw.type}/>
          <IconButton
            onClick={() => {
              const refState = swDetailsRef.current as any;
              refState.showDialog();
            }}
            color="primary"
          >
            <MoreVertIcon />
          </IconButton>
          <GenericDialog
            ref={swDetailsRef}
            content={<SWFullDetailsAccordion userId={proposal.userId} />}
            title="Skilled Worker Details"
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
        <Box>{proposal.content}</Box>
        {proposal.file.name && (
          <Box display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          mb={5}>
            <Typography
           
              sx={{ fontWeight: "bold"}}
            >
              Attached file:
            </Typography>
            <DownloadFileBottomNavigation
              handleDownloadClick={() =>
                downloadReport(`/api/multer/proposal/${proposal.file.name}`)
              }
            />

          
          </Box>
        )}
        <CardActions>
          <ProposalActionsBottomNavigation
            handleApproveClick={async () => {
              const res = confirm(
                "Are you sure you want to accept this proposal?"
              );
              if (res) {
                const {message,accepted} = await acceptProposal(
                  proposal._id,
                  proposal.userId,
                  jobId
                );
                if (accepted) {
                  setMsg(message);
                  setColor("success");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                  router.push("/c-dashboard/job");
                }else{
                  setMsg(message);
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                }
              }
            }}
            receiverId={proposal.userId}
            handleRejectClick={async() => {
              const res = confirm(
                "Are you sure you want to reject this proposal?"
              );
              if (res) {
                const {rejected,message} = await rejectProposal(
                  proposal._id,
                  jobId
                );
                if (rejected) {
                  setMsg(message);
                  setColor("success");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                  router.push("/c-dashboard/job");
                }else{
                  setMsg(message);
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                }
              }
            }}
          />
        </CardActions>
      </AccordionDetails>
    </Accordion>
  );
}
