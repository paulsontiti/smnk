import { useRouter } from "next/router";
import FormikContainer from "@/components/form/formikContainer";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { object, string } from "yup";
import SuccessAlert from "@/components/alerts/Success";
import ErrorAlert from "@/components/alerts/Error";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";

function AdsForm() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef();
  //ad submit handler
  const adSubmitHandler = async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/multer/ads/create`,
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
      if (data.successful) {
        setTimeout(() => {
          router.push("/a-dashboard/ads");
        }, 2000);
      }
    } catch (err: any) {
      setMsg("An Error occorred,please try again or contact admin");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
      return err;
    }
  };
  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    const formData = new FormData();

    formData.append("adImg", values.imgName);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("landingPage", values.landingPage);

    return new Promise((res) => {
      if (values.imgName) {
        formikHelpers
          .validateForm()
          .then(async (data: any) => {
            adSubmitHandler(formData);
            res(data);
          })
          .catch((err: any) => {
            setMsg("An Error occorred,please try again or contact admin");
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            res(err);
          });
      } else {
        setMsg("Please upload an image for the ad");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        res("");
      }
    });
  };
  const urlRegEx = new RegExp(
    `/(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})?`
  );
  const initialValues = { title: "", description: "", landingPage: "" };
  const validationSchema = object({
    title: string().required("Title is required"),
    landingPage: string()
      .matches(
        urlRegEx,
        'Landing page should look like "https://www.smnklimited.com/"'
      )
      .required("Web Address is required"),
    description: string().max(200,'Description cannot be more tha 200 characters').required("Description is required"),
  });

  const adFormControls: FormControls[] = [
    {
      name: "title",
      label: "Title",
      control: "input",
      helperText: `What's the title of your Ad`,
    },
    {
      name: "landingPage",
      label: "Landing Page",
      control: "input",
      helperText: `What's the Website Address/URL. It must contain 'https://www.websitename.com`,
    },
    {
      name: "description",
      label: "Description",
      control: "textarea",
      helperText: `What's the description of your Ad`,
    },
    {
      name: "imgName",
      label: "Upload an Image",
      control: "file",
      initiaValues: initialValues,
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      validationSchema,
      initialValues,
      adFormControls
    ),
    buttonLabel: "Submit",
    headerTitle: `Create Ad`,
    startIcon: <SendIcon />,
  };

  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />;
    </>
  );
}

export default AdsForm;
