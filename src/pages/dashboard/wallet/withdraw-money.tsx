import { useRouter } from "next/router";
import { number, object } from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRef, useState } from "react";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor, Box } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";
import axios from "axios";
import Layout from "@/components/dashboard/layout";

export default function WithdrawalPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [loading, setLoading] = useState(false);

  //declare refs
  const snackBarRef = useRef();

  const initialValues = { amount: 0, userId: _id };

  const loginSchema = object({
    amount: number()
      .min(1, "Amount cannot be 0")
      .required("Amount is required"),
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
            }
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
        <Box mt={5} width={"100%"}>
          <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
          <FormikContainer formParams={formParams} loading={loading} />
        </Box>
      </SmnkErrorBoundary>
    </Layout>
  );
}
