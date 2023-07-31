import React, { useRef, useState } from "react";
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { Correction } from "@/lib/correction";
import axios from "axios";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "../snackbar/SnackBar";

function CorrectionForm({
  jobId,
  reportId,
  url,
}: {
  jobId: string;
  reportId: string;
  url: string;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  //correction submit handler
  const correctionSubmitHandler = async (
    values: Correction,
    router: any,
    url: string
  ) => {
    try {
      if (values.reportId && values.jobId) {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/correction/make-correction`,
          data: values,
        });
        const data = await res.data;
        if (data.successful) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          router.push("/c-dashboard/job");
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } else {
        setMsg("Invalid request");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
      setMsg("An Error occurred");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      return err;
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          correctionSubmitHandler(values, router, url);
          res(data);
        })
        .catch((err: any) => {
          setMsg("An Error occurred");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          console.log("Error from formik ", err);
          res(err);
        });
    });
  };

  const initialValues: Correction = {
    correction: "",
    subject: "",
    reportId,
    jobId,
    read: false,
    seen: false,
  };
  const validationSchema = object({
    correction: string().required("Correction is required"),
    subject: string().required("Subject is required"),
  });

  const correctionFormControls: FormControls[] = [
    { name: "subject", label: "Subject", control: "input" },
    { name: "correction", label: "Correction", control: "textarea" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      validationSchema,
      initialValues,
      correctionFormControls
    ),
    buttonLabel: "Send",
    headerTitle: `What's wrong`,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}

export default CorrectionForm;
