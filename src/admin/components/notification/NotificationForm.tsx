import { useRouter } from "next/router";
import FormikContainer from "@/components/form/formikContainer";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { object, string } from "yup";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";

function NotificationForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();
  //notification submit handler
  const notificationSubmitHandler = async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/a-dashboard/notification/create`,
        data: values,
      });
      const data = await res.data;
      if (data.successful) {
        setMsg(data.message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      } else {
        setMsg(data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    } catch (err: any) {
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
          notificationSubmitHandler(values);
          setLoading(false);
          setTimeout(() => {
            router.reload();
          }, 6000);
          res(data);
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

  const initialValues = { title: "", message: "" };
  const validationSchema = object({
    title: string().required("Title is required"),

    message: string().required("Message is required"),
  });

  const notificationFormControls: FormControls[] = [
    {
      name: "title",
      label: "Title",
      control: "input",
      helperText: `What's the title of your Message`,
    },

    {
      name: "message",
      label: "Message",
      control: "textarea",
      helperText: `What's your Message`,
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      validationSchema,
      initialValues,
      notificationFormControls
    ),
    buttonLabel: "Broadcast",
    headerTitle: `Create Notification`,
    startIcon: <SendIcon />,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />;
    </>
  );
}

export default NotificationForm;
