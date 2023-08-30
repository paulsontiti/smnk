import { useRouter } from "next/router";
import { number, object, string } from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRef, useState } from "react";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";
import axios from "axios";
import Layout from "@/components/dashboard/layout";
import { banks } from "@/lib/types/bank-details";

export default function WithdrawalPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [loading, setLoading] = useState(false);

  //declare refs
  const snackBarRef = useRef();

  const initialValues = {
    amount: 0,
    userId: _id,
    accountName: "",
    accountNumber: "",
    bankName: "",
    email: "",
    password: "",
  };

  const loginSchema = object({
    amount: number()
      .min(1, "Amount cannot be 0")
      .required("Amount is required"),
    accountName: string().required("Account Name is required"),
    accountNumber: string()
      .min(10, "Account Number can not be less than 10 numbers")
      .max(10, "Account Number can not be more than 10 numbers")
      .required("Account Number is required"),
    bankName: string().required("Bank Name is required"),
    email: string().email("Invalid Email").required("Email is required"),
    password: string().required("Password is required"),
  });

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          try {
            const result = await axios({
              method: "POST",
              url: `${process.env.SMNK_URL}api/wallet/withdraw`,
              data: values,
            });
            const data = await result.data;
            if (data.successful) {
              setMsg(data.message);
              setColor("success");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              setLoading(false);
              res("");
              setTimeout(() => {
                router.back();
              }, 3000);
            } else {
              setMsg(data.message);
              setColor("error");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              setLoading(false);
              res("");
              setTimeout(() => {
                router.reload();
              }, 3000);
            }
          } catch (err: any) {
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            setLoading(false);
            res(err);
            setTimeout(() => {
              router.reload();
            }, 3000);
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
    { name: "accountName", label: "Account Name", control: "input" },
    { name: "accountNumber", label: "Account Number", control: "input" },
    {
      name: "bankName",
      label: "Bank Name",
      control: "freesolo",
      options: banks,
    },
    { name: "email", label: "Email", control: "input", type: "email" },
    { name: "password", label: "Password", control: "input", type: "password" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      loginSchema,
      initialValues,
      walletFormControls
    ),
    buttonLabel: "Withdraw",
    headerTitle: "Withdraw Money",
  };

  return (
    <Layout>
      <SmnkErrorBoundary>
        <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
        <FormikContainer
          formParams={formParams}
          loading={loading}
          note=" Note: Money will be disbursed to your account in 3-5 working days"
        />
      </SmnkErrorBoundary>
    </Layout>
  );
}
