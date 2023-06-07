import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useRouter } from "next/router";
import { object, ref, string } from "yup";
import { signUpDetails } from "@/lib/types/signUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signUp, updateState } from "@/store/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";

const initialValues: signUpDetails = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  type: "Skilled Worker",
  typeClass: "Individual",
};

export default function SignUp() {
  const router = useRouter();
  const { user,response,successful} = useSelector((state: RootState) => state.users);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

    //declare refs
    const snackBarRef = useRef();

  useEffect(() => {
    if(response){
      if(successful){
        setMsg(response);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState())
      }else{
        setMsg(response);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState())
      }
    }
    if (user) {
      switch (true) {
        case user.type === "skilled worker":
          router.push("/sw-dashboard");
          break;
        case user.type === "client":
          router.push("/c-dashboard");
          break;
        case user.type === "admin":
          router.push("/a-dashboard");
          break;
      }
    }
  }, [user, router,successful,response,dispatch]);

  //sign up submit handler
  const submitHandler = async (values: signUpDetails) => {
    await dispatch(signUp(values));
    //console.log('')
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          const msg = await submitHandler(values);
          res(msg);
        })
        .catch((err: any) => {
          res(err);
        });
    });
  };

  const signupSchema = object({
    email: string().email("invalid email").required("Email is required"),
    phone: string().required("Phone is required"),
    password: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), ""], "Both Passwords must match")
      .required("Confirm Password is required"),
  });

  const signUpFormControls: FormControls[] = [
    { name: "email", label: "Email", control: "input", type: "email" },
    { name: "phone", label: "Phone Number", control: "input", type: "phone" },
    { name: "password", label: "Password", control: "input", type: "password" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      control: "input",
      type: "password",
    },
    {
      name: "type",
      label: "Are you a Skilled Worker Or a Client",
      control: "radio",
      options: [
        { label: "Skilled Worker", value: "Skilled Worker" },
        { label: "Client", value: "Client" },
      ],
    },
    {
      name: "typeClass",
      label: "Are you an Individual Or a Company",
      control: "radio",
      options: [
        { label: "Individual", value: "Individual" },
        { label: "Company", value: "Company" },
      ],
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      signupSchema,
      initialValues,
      signUpFormControls
    ),
    buttonLabel: "SignUp",
    headerTitle: "Create Your SMNK Account",
    endIcon: <AccountBoxIcon />,
  };

  return (
    <>
    <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
    </>
  );
}
