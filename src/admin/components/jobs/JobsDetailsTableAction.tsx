import { Box, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsMenuComponent, {
  MenuAction,
} from "@/components/menu/ActionsMenuComponent";
import GenericDialog from "@/components/dialog/GenericDialog";
import JobComplaintsContent from "@/components/dialog/contents/JobComplaintsContent";
import AdminChatAction from "@/components/dialog/actions/AdminChatAction";
import JobDetailsContent from "@/components/dialog/contents/JobDetailsContent";
import SWDetailsNoCollapse from "@/components/card/SWDetailsNoCollapse";
import { ClientProfile } from "@/components/card/ClientDetailsDashboard";

function JobsDetailsTableAction({ params, rowId, setRowId }: any) {
  //declare component's state
  const [success, setSuccess] = useState(false);

  //declare refs
  const actionMenuRef = useRef();
  const jobDetailsRef = useRef();
  const jobComplaintRef = useRef();
  const clientDetaisRef = useRef();
  const swDetaisRef = useRef();
  //actions menu
  const actionMenu: MenuAction[] = [
    {
      label: "More Details",
      handleClick: () => {
        const refState = jobDetailsRef.current as any;
        refState.showDialog();
      },
    },
    {
      label: "Complaints",
      disabled: params.row.complaints.length < 1,
      handleClick: () => {
        const refState = jobComplaintRef.current as any;
        refState.showDialog();
      },
    },
    {
      label: "Client Details",
      handleClick: () => {
        const refState = clientDetaisRef.current as any;
        refState.showDialog();
      },
    },
    {
      label: "SW Details",
      disabled: params.row.swId ? false : true,
      handleClick: () => {
        const refState = swDetaisRef.current as any;
        refState.showDialog();
      },
    },
  ];

  useEffect(() => {
    if (rowId === params.row._id && success) {
      setSuccess(false);
    }
  }, [rowId, params.row._id, success]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <IconButton
        sx={{ marginRight: "1rem" }}
        onClick={(e) => {
          const refState = actionMenuRef.current as any;
          refState.handleClick(e);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <ActionsMenuComponent menuActions={actionMenu} ref={actionMenuRef} />
      <GenericDialog
        title="Job Details"
        content={<JobDetailsContent jobId={params.row._id} />}
        ref={jobDetailsRef}
      />
      <GenericDialog
        title={params.row.jobDetails.title}
        content={<JobComplaintsContent jobId={params.row._id} />}
        actions={<AdminChatAction receiverId={params.row.userId} />}
        ref={jobComplaintRef}
      />
      <GenericDialog
        title="Client Details"
        content={<ClientProfile clientId={params.row.userId} forSw={true} />}
        actions={<AdminChatAction receiverId={params.row.userId} />}
        ref={clientDetaisRef}
      />
      <GenericDialog
        title="SW Details"
        content={
          <SWDetailsNoCollapse forClient={true} userId={params.row.swId} />
        }
        actions={<AdminChatAction receiverId={params.row.swId} />}
        ref={swDetaisRef}
      />
    </Box>
  );
}

export default JobsDetailsTableAction;
