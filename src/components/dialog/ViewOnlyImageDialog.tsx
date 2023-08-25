import React, { useImperativeHandle, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LoadingButton } from "@mui/lab";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackImage } from "../avatar/DashboardDp";

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

const ViewOnlyImageDialog = React.forwardRef(({}, _ref) => {
  //declare component's state
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

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

  return (
    <SmnkErrorBoundary>
      <>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent dividers>
            <BlackImage src={imgSrc} alt="" width={300} height={300} />
          </DialogContent>

          <DialogActions>
            <LoadingButton
              autoFocus
              onClick={handleClose}
              size="small"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Close
            </LoadingButton>
          </DialogActions>
        </BootstrapDialog>
      </>
    </SmnkErrorBoundary>
  );
});

ViewOnlyImageDialog.displayName = "ViewOnlyImageDialog";
export default ViewOnlyImageDialog;
