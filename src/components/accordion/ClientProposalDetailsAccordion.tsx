import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, CardActions, Button, Typography } from "@mui/material";
import { getUser } from "@/lib/user";
import { useEffect, useRef, useState } from "react";
import { User } from "@/lib/types/userInfo";
import { acceptProposal, rejectProposal } from "@/lib/proposal";
import { useRouter } from "next/router";
import { downloadReport } from "./ClientReportDetails";
import DownloadFileBottomNavigation from "../bottomNavigation/DownloadFileBottomNavigation";
import ProposalActionsBottomNavigation from "../bottomNavigation/ProposalActionsBottomNavigation";
import GenericDialog from "../dialog/GenericDialog";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import GenericActions from "../dialog/actions/GenericActions";
import GenericContent from "../dialog/contents/GenericContent";
import FileReaderCard from "../card/FileReaderCard";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWDetailsNoCollapse from "../card/SWDetailsNoCollapse";

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
  const acceptDialogRef = useRef();
  const rejectDialogRef = useRef();
  const readFileDialogRef = useRef();

  const confirmAcceptAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = acceptDialogRef.current as any;
      refState.closeDialog();
    } else {
      const refState = acceptDialogRef.current as any;
      refState.closeDialog();
      const { message, accepted } = await acceptProposal(
        proposal._id,
        proposal.userId,
        jobId
      );
      if (accepted) {
        setMsg(message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 6000);
      } else {
        setMsg(message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    }
  };
  const readFileDialogHandler = () => {
    const refState = readFileDialogRef.current as any;
    refState.showDialog();
  };
  const acceptDialogHandler = () => {
    const refState = acceptDialogRef.current as any;
    refState.showDialog();
  };

  const confirmRejectAction = async (confirm: boolean) => {
    if (!confirm) {
      const refState = rejectDialogRef.current as any;
      refState.closeDialog();
    } else {
      const refState = rejectDialogRef.current as any;
      refState.closeDialog();
      const { rejected, message } = await rejectProposal(proposal._id, jobId);
      if (rejected) {
        setMsg(message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.reload();
        }, 6000);
      } else {
        setMsg(message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    }
  };
  const rejectDialogHandler = () => {
    const refState = rejectDialogRef.current as any;
    refState.showDialog();
  };

  useEffect(() => {
    (async () => {
      const user = await getUser(proposal.userId);
      setSw(user);
    })();
  }, [proposal.userId]);

  if (
    !jobId ||
    !proposal ||
    (proposal && proposal.rejected) ||
    proposal.accepted
  )
    return <p></p>;

  return (
    <SmnkErrorBoundary>
      <SWDetailsNoCollapse forClient={true} userId={proposal.userId} />
      <AccordionDetails>
        {/* <SWFullDetailsAccordion userId={proposal.userId} /> */}
        <GenericDialog
          ref={acceptDialogRef}
          content={
            <GenericContent message="Are you sure you want to accept this proposal" />
          }
          actions={<GenericActions confirmAction={confirmAcceptAction} />}
        />
        <GenericDialog
          ref={rejectDialogRef}
          content={
            <GenericContent message="Are you sure you want to reject this proposal" />
          }
          actions={<GenericActions confirmAction={confirmRejectAction} />}
        />
        <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
        <Box bgcolor={"whitesmoke"} p={1}>
          <Typography variant="h6">Proposal:</Typography>
          {proposal.content}
        </Box>
        {proposal.file.name && (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            mb={5}
            mt={5}
            minWidth={"100%"}
          >
            <Typography sx={{ fontWeight: "bold" }}>Attached file:</Typography>
            <DownloadFileBottomNavigation
              handleDownloadClick={() =>
                downloadReport(`/api/multer/proposal/${proposal.file.name}`)
              }
            />
            <Button onClick={readFileDialogHandler}>View File</Button>
            <GenericDialog
              title=""
              content={
                <FileReaderCard
                  filename={proposal.file.name}
                  contentType={proposal.file.contentType}
                />
              }
              actions={<p></p>}
              ref={readFileDialogRef}
            />
          </Box>
        )}

        <CardActions>
          <ProposalActionsBottomNavigation
            handleApproveClick={acceptDialogHandler}
            receiverId={proposal.userId}
            handleRejectClick={rejectDialogHandler}
          />
        </CardActions>
      </AccordionDetails>
    </SmnkErrorBoundary>
  );
}
