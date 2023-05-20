import {
  Box,
  CircularProgress,
  Fab,
  Tooltip,
  SnackbarOrigin,
  AlertColor,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsMenuComponent, {
  MenuAction,
} from "@/components/menu/ActionsMenuComponent";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import GenericDialog from "@/components/dialog/GenericDialog";
import JobComplaintsContent from "@/components/dialog/contents/JobComplaintsContent";
import AdminChatAction from "@/components/dialog/actions/AdminChatAction";
import UserDetailsContent from "@/components/dialog/contents/UserDetailsContent";
import JobDetailsContent from "@/components/dialog/contents/JobDetailsContent";

export interface State extends SnackbarOrigin {
  open: boolean;
}

function JobsDetailsTableAction({ params, rowId, setRowId }: any) {
  //declare component's state
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef();
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
      disabled:params.row.complaints.length < 1,
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
  }, [rowId,params.row._id,success]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <SnackbarComponent color={color} msg={msg} ref={snackBarRef} />
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 30,
            height: 30,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="success"
          sx={{
            width: 30,
            height: 30,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
          disabled={params.id !== rowId || loading}
          //onClick={handleSubmit}
        >
          <Tooltip title="Save changes">
            <Save />
          </Tooltip>
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={40}
          sx={{
            color: green[500],
            position: "absolute",
            top: -1,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
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
        actions={<AdminChatAction />}
        ref={jobComplaintRef}
      />
      <GenericDialog
        title="Client Details"
        content={<UserDetailsContent userId={params.row.userId} />}
        actions={<AdminChatAction />}
        ref={clientDetaisRef}
      />
      <GenericDialog
        title="SW Details"
        content={<UserDetailsContent userId={params.row.swId} />}
        actions={<AdminChatAction />}
        ref={swDetaisRef}
      />
    </Box>
  );
}

export default JobsDetailsTableAction;
