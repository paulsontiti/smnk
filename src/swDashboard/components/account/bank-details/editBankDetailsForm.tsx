import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BankDetails,
  bankDetailsFormControls,
  bankDetailsSchema,
  bankDetailsSubmitHandler,
} from "@/lib/types/bank-details";
import FormikContainer from "@/components/form/formikContainer";
import { FormParams, createFormObject } from "@/lib/form";
import { SnackBarParams } from "@/lib/types/service";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { updateSWExtra } from "@/store/slices/swExtraSlice";

export default function EditBankDetailsForm() {
  const {
    users: {
      user: { _id },
    },
  } = useSelector((state: RootState) => state);

  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  const router = useRouter();
  const initialValues: BankDetails = {
    bankName: "",
    accountName: "",
    accountNumber: "",
  };
  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      if (_id) {
        formikHelpers
          .validateForm()
          .then(async (data: any) => {
            const snackbarParams: SnackBarParams = {
              setMsg,
              setColor,
              snackBarRef,
            };
            const msg = await bankDetailsSubmitHandler(
              _id,
              values,
              router,
              snackbarParams
            );
            //update user object in localstorage
            dispatch(updateSWExtra());
            setLoading(false);
            res(msg);
          })
          .catch((err: any) => {
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            console.log("Error from formik ", err);
            setLoading(false);
            res(err);
          });
      } else {
        setMsg("Invalid request!!");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setLoading(false);
        res(msg);
      }
    });
  };

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      bankDetailsSchema,
      initialValues,
      bankDetailsFormControls
    ),
    buttonLabel: "Upload",
    headerTitle: "Edit Your Bank Details",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
