import React, { useImperativeHandle, useRef, useState } from "react";
import { AlertColor, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AdminChatAction from "./actions/AdminChatAction";
import { SmnkErrorBoundary } from "@/pages/_app";
import { BlackImage } from "../avatar/DashboardDp";
import { useRouter } from "next/router";
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { number, object, string } from "yup";
import axios from "axios";
import SnackbarComponent from "../snackbar/SnackBar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddMoneyImageDialog = React.forwardRef(
  ({ userId }: { userId: string }, _ref) => {
    //declare component's state
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [msg, setMsg] = useState("");
    const [color, setColor] = useState<AlertColor>("error");

    const [loading, setLoading] = useState(false);

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
    const snackBarRef = useRef();

    //handle close event
    const handleClose = () => {
      setOpen(false);
    };

    const initialValues = { amount: 0, userId };

    const walletSchema = object({
      amount: number()
        .min(1, "Amount can not be zero")
        .required("Amount is required"),
    });
    //formik submit handler
    const formikSubmitHandler = (values: any, formikHelpers: any) => {
      setLoading(true);
      handleClose();
      return new Promise((res) => {
        formikHelpers
          .validateForm()
          .then(async (data: any) => {
            try {
              const result = await axios({
                method: "POST",
                url: `${process.env.SMNK_URL}api/wallet/credit-account`,
                data: values,
              });
              const data = await result.data;
              setMsg(data.message);
              setColor("success");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              setLoading(false);
              res("");
            } catch (err: any) {
              setMsg(err.message);
              setColor("error");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              setLoading(false);
              res(err);
            }
          })
          .catch((err: any) => {
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            setLoading(false);
            res(err);
          });
      });
    };
    const walletFormControls: FormControls[] = [
      {
        name: "amount",
        label: "Amont",
        control: "input",
      },
    ];

    const formParams: FormParams = {
      formObject: createFormObject(
        formikSubmitHandler,
        walletSchema,
        initialValues,
        walletFormControls
      ),
      buttonLabel: "Add Money",
      headerTitle: "Credit User Account",
    };
    return (
      <SmnkErrorBoundary>
        <>
          <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogContent dividers>
              <BlackImage src={imgSrc} alt="" width={500} height={500} />
            </DialogContent>

            <DialogActions>
              <AdminChatAction receiverId={userId} />
            </DialogActions>
            <FormikContainer
              formParams={formParams}
              loading={loading}
              forAdminAddMoney={true}
            />
          </BootstrapDialog>
        </>
      </SmnkErrorBoundary>
    );
  }
);

AddMoneyImageDialog.displayName = "AddMoneyImageDialog";
export default AddMoneyImageDialog;
