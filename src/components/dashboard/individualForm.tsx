import { object, string } from "yup";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IndividualPersonalInfo } from "@/lib/types/userInfo";
import axios from "axios";
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject, states } from "@/lib/form";
import SnackbarComponent from "../snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";

export default function IndividualForm({ router }: { router: any }) {
  const { user } = useSelector((state: RootState) => state.users);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialvalues] = useState<IndividualPersonalInfo>({
    firstName: "",
    lastName: "",
    userName: "",
    state: "",
    lga: "",
    address: "",
    description: "",
    userId: user._id,
  });

  //declare refs
  const snackBarRef = useRef();

  const individualInfoSchema = object({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    userName: string().required("Username is required"),
    address: string().required("Street Address is required"),
    state: string().required("State is required"),
    lga: string().required("L.G.A is required"),
    description: string().required("Description is required"),
  });

  //sign up submit handler
  const submitHandler = async (values: IndividualPersonalInfo) => {
    if (user) {
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/personal-info/add-personal-info`,
          data: values,
        });
        const data = await res.data;
        if (data.info) {
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.push("/dashboard/individual");
          }, 3000);
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        setMsg(err.response.data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        return;
      }
    } else {
      setMsg("Bad request!!!!");
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setInitialvalues(values);
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await submitHandler(values);
          setLoading(false);
          res(msg);
        })
        .catch((err: any) => {
          setMsg("An Error occured,please try again later");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(err);
        });
    });
  };

  const formControls: FormControls[] = [
    { name: "firstName", label: "First Name", control: "input" },
    { name: "lastName", label: "Last Name", control: "input" },
    { name: "userName", label: "User Name", control: "input" },
    { name: "state", label: "State", control: "auto", options: states },
    {
      name: "lga",
      label: "LGA",
      control: "auto",
      options: states,
      fieldToCheckAgainst: "state",
      valueOfFieldToCheckAgainst: "",
    },
    { name: "address", label: "Address", control: "input" },
    {
      name: "description",
      label: "Description",
      control: "textarea",
      helperText: "Describe what you do for clients to see.",
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      individualInfoSchema,
      initialValues,
      formControls
    ),
    buttonLabel: "Create Profile",
    headerTitle: "Create Your Profile",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
