import React, { useImperativeHandle, useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LoadingButton } from "@mui/lab";
import SnackbarComponent from "../snackbar/SnackBar";
import AdminChatAction from "./actions/AdminChatAction";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackImage } from "../avatar/DashboardDp";
import { useRouter } from "next/router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ImageDialog = React.forwardRef(
  (
    { action, receiverId }: { receiverId: string; action: () => Promise<any> },
    _ref
  ) => {
    //declare component's state
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [imgSrc2, setImgSrc2] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [color, setColor] = useState<AlertColor>("error");

    const router = useRouter();

    //useimperative
    useImperativeHandle(_ref, () => ({
      showDialog: () => {
        setOpen(true);
      },
      updateSrc: (src: string, src2?: string) => {
        setImgSrc(src);
        setImgSrc2(src2 ?? "");
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
        router.reload();
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
              <BlackImage src={imgSrc} alt="" width={600} height={600} />
            </DialogContent>
            {imgSrc2 && (
              <DialogContent dividers>
                <BlackImage src={imgSrc2} alt="" width={600} height={600} />
              </DialogContent>
            )}
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
              <AdminChatAction receiverId={receiverId} />
            </DialogActions>
          </BootstrapDialog>
        </>
      </SmnkErrorBoundary>
    );
  }
);

ImageDialog.displayName = "ImageDialog";
export default ImageDialog;
