import React, { useImperativeHandle, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LoadingButton } from "@mui/lab";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackImage } from "../avatar/DashboardDp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateSWExtra } from "@/store/slices/swExtraSlice";

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
  const { _id } = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch<AppDispatch>();
  //declare component's state
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [catalogId, setCatalogId] = useState("");
  const [forClient, setForClient] = useState(false);

  //useimperative
  useImperativeHandle(_ref, () => ({
    showDialog: () => {
      setOpen(true);
    },
    updateSrc: (src: string) => {
      setImgSrc(src);
    },
    updateCatalogId: (catalogId: string) => {
      setCatalogId(catalogId);
    },
    updateForClient: (forClient: boolean) => {
      setForClient(forClient);
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
            {!forClient && (
              <LoadingButton
                autoFocus
                onClick={async () => {
                  handleClose();
                  //get sw extra from localstorage
                  const swExtra = JSON.parse(
                    localStorage.getItem("swExtra") as string
                  );
                  //check if swExtra is null and if catalog exist
                  if (swExtra && Array.isArray(swExtra.catalog)) {
                    const catalog = swExtra.catalog.filter(
                      (cat: any) => cat._id !== catalogId
                    );
                    swExtra.catalog = catalog;
                    //update swextra
                    localStorage.setItem("swExtra", JSON.stringify(swExtra));
                    //uddate state
                    dispatch(updateSWExtra());
                    try {
                      const res = await axios({
                        method: "POST",
                        url: `${process.env.SMNK_URL}api/multer/catalog/delete`,
                        data: { userId: _id, catalog },
                      });
                      const data = res.data;
                      if (!data.successful) {
                        alert(data.message);
                      }
                    } catch (err: any) {}
                  }
                }}
                size="small"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Delete
              </LoadingButton>
            )}
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
