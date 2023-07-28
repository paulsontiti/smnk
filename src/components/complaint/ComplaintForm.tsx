import React, { useRef, useState } from "react";
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { Complaint } from "@/lib/complaint";
import axios from "axios";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";

function ComplaintForm({ jobId, url }: { jobId: string; url: string }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  //complaint submit handler
  const complaintSubmitHandler = async (
    values: Complaint,
    router: any,
    url: string
  ) => {
    try {
      if (values.jobId) {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/complaint/make-complaint`,
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
        setMsg("Invalid Request");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
      setMsg("Something wrong happened. Please try again");
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
          complaintSubmitHandler(values, router, url);
          res(data);
        })
        .catch((err: any) => {
          console.log("Error from formik ", err);
          res(err);
        });
    });
  };

  const initialValues: Complaint = {
    complaint: "",
    subject: "",
    jobId,
    read: false,
    seen: false,
  };
  const validationSchema = object({
    complaint: string().required("Correction is required"),
    subject: string().required("Subject is required"),
  });

  const complaintFormControls: FormControls[] = [
    { name: "subject", label: "Subject", control: "input" },
    { name: "complaint", label: "Complaint", control: "textarea" },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      validationSchema,
      initialValues,
      complaintFormControls
    ),
    buttonLabel: "Submit",
    headerTitle: `What's wrong`,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}

export default ComplaintForm;
