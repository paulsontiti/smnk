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
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import { SnackBarParams } from "@/lib/types/service";
import { updateSWExtra } from "@/store/slices/swExtraSlice";

export default function AddBankDetailsForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  const { _id } = useSelector((state: RootState) => state.users.user);
  const [initialValues, setInitialValues] = useState<BankDetails>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setInitialValues(values);
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
        setMsg("Invalid request, Please provide UserId");
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
    headerTitle: "Add Your Bank Details",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
