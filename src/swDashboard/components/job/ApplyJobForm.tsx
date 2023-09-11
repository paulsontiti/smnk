import { validFile } from "@/components/catalog/AddFile";
import FormikContainer from "@/components/form/formikContainer";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { AlertColor } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { object, string } from "yup";

function ApplyJobForm({ userId, jobId }: { userId: string; jobId: string }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  const initialValues = {
    content: "",
    userId,
    jobId,
  };

  const applyJobSchema = object({
    content: string().required("Proposal is required"),
  });

  const submitHandler = async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/users/proposal/create-proposal`,
        data: values,
      });
      const data = await res.data;

      if (data.successful) {
        setMsg(data.message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
          router.push("/dashboard/job/recommended-jobs");
        }, 6000);
      } else {
        setMsg(data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
      console.log(err);
      setMsg(err.message);
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      return err;
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          //check if file is available
          if (values.proposalFile) {
            //checkif the file is valid
            const isFileValid = validFile(values.proposalFile);
            if (isFileValid === "valid") {
              const formData = new FormData();

              formData.append("proposalFile", values.proposalFile);
              formData.append("content", values.content);
              formData.append("userId", values.userId);
              formData.append("jobId", values.jobId);
              submitHandler(formData);
              setLoading(false);
              res(data);
            } else {
              setMsg(isFileValid);
              setColor("error");
              const refState = snackBarRef.current as any;
              refState.handleClick();
              setLoading(false);
              res(data);
            }
          } else {
            const formData = new FormData();
            formData.append("content", values.content);
            formData.append("userId", values.userId);
            formData.append("jobId", values.jobId);
            submitHandler(formData);
            setLoading(false);
            res(data);
          }
        })
        .catch((err: any) => {
          console.log("Error from formik ", err);
          setMsg(err.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(err);
        });
    });
  };

  const proposlFormControls: FormControls[] = [
    { name: "content", label: "Proposal", control: "textarea" },
    {
      name: "proposalFile",
      label: "Attatch a file",
      control: "file",
      initiaValues: initialValues,
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      applyJobSchema,
      initialValues,
      proposlFormControls
    ),
    buttonLabel: "Submit",
    headerTitle: `What's your proposal`,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer
        formParams={formParams}
        loading={loading}
        notes={[
          "Only images,audio,videos and pdf files that are less than 10mb are allowed",
        ]}
      />
    </>
  );
}

export default ApplyJobForm;
