import React, { useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GenericDialog = React.forwardRef(
  (
    {
      title,
      content,
      actions,
    }: {
      title?: string;
      content: JSX.Element;
      actions?: JSX.Element;
    },
    _ref
  ) => {
    const [open, setOpen] = React.useState(false);

    //useimperative
    useImperativeHandle(_ref, () => ({
      showDialog: () => {
        setOpen(true);
      },
      closeDialog: () => {
        setOpen(false);
      },
    }));

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <SmnkErrorBoundary>
        <Box minWidth={"100%"}>
          <Dialog
            sx={{ minWidth: "100%" }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
          </Dialog>
        </Box>
      </SmnkErrorBoundary>
    );
  }
);
GenericDialog.displayName = "GenericDialog";
export default GenericDialog;
