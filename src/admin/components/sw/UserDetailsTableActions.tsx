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
import { suspendRestoreUser } from "@/lib/admin";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import ActionsMenuComponent, {
  MenuAction,
} from "@/components/menu/ActionsMenuComponent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericDialog from "@/components/dialog/GenericDialog";
import UserProfileContent from "@/components/dialog/contents/UserProfileContent";
import { getSWExtraDetails, getUserProfile } from "@/lib/utils/user";
import UserExpContent from "@/components/dialog/contents/UserExpContent";
import UserServicesContent from "@/components/dialog/contents/UserServicesContent";
import { SWExtra } from "@/lib/types/userInfo";

export interface State extends SnackbarOrigin {
  open: boolean;
}

function UserDetailsTableActions({ params, rowId, setRowId }: any) {
  //declare component states
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swExtra, setSwExtra] = useState<SWExtra>({} as SWExtra);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  //state of profile action link. Disable if user has no profile
  const [profileDisabled, setProfileDisabled] = useState(false);

  //declare refs
  const snackBarRef = useRef();
  const actionMenuRef = useRef();
  const userProfileRef = useRef();
  const userExpRef = useRef();
  const userServRef = useRef();

  useEffect(() => {
    (async () => {
      //get user profile and disable the profile link if profile is null
      const { data } = await getUserProfile(params.row._id);
      data ? setProfileDisabled(false) : setProfileDisabled(true);

      //get sw extra
      const result = await getSWExtraDetails(params.row._id);
      setSwExtra(result.data);
    })();
  }, [params.row._id]);

  //actions menu for skilled workers
  const SWActionMenu: MenuAction[] = [
    {
      label: "Profile",
      handleClick: () => {
        const refState = userProfileRef.current as any;
        refState.showDialog();
      },
      disabled: profileDisabled,
    },
  ];

  //actions menu for clients
  const ClientActionMenu: MenuAction[] = [
    {
      label: "Profile",
      handleClick: () => {
        const refState = userProfileRef.current as any;
        refState.showDialog();
      },
      disabled: profileDisabled,
    },
  ];

  //submit handler for suspending or restoring user's account
  const handleSubmit = async () => {
    setLoading(true);
    const data = await suspendRestoreUser(params.row._id, params.row.active);

    setColor(data.successful ? "success" : "error");
    setMsg(data.message);
    const refState = snackBarRef.current as any;
    refState.handleClick();
    setLoading(false);
    setSuccess(data.successful);
  };

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
      <SnackbarComponent ref={snackBarRef} msg={msg} color={color} />
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
          onClick={handleSubmit}
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
      <ActionsMenuComponent
        menuActions={
          params.row.type === "skilled worker" ? SWActionMenu : ClientActionMenu
        }
        ref={actionMenuRef}
      />
      <GenericDialog
        ref={userProfileRef}
        content={<UserProfileContent userId={params.row._id} />}
        title={
          params.row.type === "skilled worker"
            ? "Skilled Worker Profile"
            : "Client Profile"
        }
      />
    </Box>
  );
}

export default UserDetailsTableActions;
