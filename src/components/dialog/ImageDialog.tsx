import React, { useImperativeHandle, useRef, useState } from "react";
import { AlertColor, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import SnackbarComponent from "../snackbar/SnackBar";
import AdminChatAction from "./actions/AdminChatAction";
import { SmnkErrorBoundary } from "@/pages/_app";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ImageDialog = React.forwardRef(
  (
    { action, receiverId }: { receiverId: string; action: () => Promise<any> },
    _ref
  ) => {
    //declare component's state
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [color, setColor] = useState<AlertColor>("error");

    //useimperative
    useImperativeHandle(_ref, () => ({
      showDialog: () => {
        setOpen(true);
      },
      updateSrc: (src: string) => {
        setImgSrc(src);
      },
    }));

    //ref for snackbar
    const snackbarRef = useRef();

    //handle close event
    const handleClose = () => {
      setOpen(false);
    };

    //handle confirm button click
    const handleConfirmButtonClick = async () => {
      const confirmed = await action();
      if (confirmed) {
        setColor("success");
        setMsg("Action Successful");
        const refState = snackbarRef.current as any;
        refState.handleClick();
        handleClose();
      } else {
        setColor("error");
        setMsg("Action not Successful");
        const refState = snackbarRef.current as any;
        refState.handleClick();
        handleClose();
      }
    };

    return (
     <SmnkErrorBoundary>
       <>
        <SnackbarComponent msg={msg} color={color} ref={snackbarRef} />
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent dividers>
            <Image src={imgSrc} alt="" width={400} height={400} />
          </DialogContent>
          <DialogActions>
            <LoadingButton
              autoFocus
              onClick={() => {
                setLoading(true);
                handleConfirmButtonClick();
                setLoading(false);
              }}
              size="small"
              loading={loading}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Confirm
            </LoadingButton>
            <AdminChatAction receiverId="" />
          </DialogActions>
        </BootstrapDialog>
      </>
     </SmnkErrorBoundary>
    );
  }
);

ImageDialog.displayName = "ImageDialog";
export default ImageDialog;
