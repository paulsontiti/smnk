import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BankDetails,
  bankDetailsFormControls,
  bankDetailsSchema,
  bankDetailsSubmitHandler,
} from "@/lib/types/bank-details";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from "@/store/slices/userSlice";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import { SnackBarParams } from "@/lib/types/service";

export default function AddBankDetailsForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  //declare refs
  const snackBarRef = useRef();

  const { _id } = useSelector((state: RootState) => state.users.user);

  const initialValues: BankDetails = {
    accountName: "",
    accountNumber: "",
    bankName: "",
    userId: _id,
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    if (values.userId) {
      return new Promise((res) => {
        formikHelpers
          .validateForm()
          .then(async (data: any) => {
            const snackbarParams: SnackBarParams = {
              setMsg,
              setColor,
              snackBarRef,
            };
            const msg = await bankDetailsSubmitHandler(
              values,
              router,
              snackbarParams
            );
            dispatch(updateUser());
            res(msg);
          })
          .catch((err: any) => {
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            console.log("Error from formik ", err);
            res(err);
          });
      });
    } else {
      setMsg("Invalid request, Please provide UserId");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      bankDetailsSchema,
      initialValues,
      bankDetailsFormControls
    ),
    buttonLabel: "Add Bank Details",
    headerTitle: "Add Your Bank Details",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
    </>
  );
}
