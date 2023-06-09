import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useRouter } from "next/router";
import { boolean, object, ref, string } from "yup";
import { signUpDetails } from "@/lib/types/signUp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signUp, updateState } from "@/store/slices/userSlice";
import { useEffect, useRef, useState } from "react";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { getSWExtra } from "@/store/slices/swExtraSlice";
import Link from "next/link";

// program to generate random strings

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const getSignUpDetails = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const valuesStr = localStorage.getItem("values");
    if (valuesStr) {
      const values = JSON.parse(JSON.stringify(valuesStr));
      if (values !== "undefined") {
        return JSON.parse(values) as signUpDetails;
      }
    }
  }
};
export default function SignUp() {
  const [verificationCode, setverificationCode] = useState("");

  const router = useRouter();

  const { user, response, successful } = useSelector(
    (state: RootState) => state.users
  );
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  //declare refs
  const snackBarRef = useRef();

  const [initialValues, setInitiaValues] = useState<signUpDetails>(
    getSignUpDetails() ?? {
      email: "",
      emailVerificationCode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      type: "Skilled Worker",
      typeClass: "Individual",
      tc: false,
    }
  );

  useEffect(() => {
    setverificationCode(generateString(10));
  }, []);

  useEffect(() => {
    if (response) {
      if (successful) {
        setMsg(response);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState());
      } else {
        setMsg(response);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        dispatch(updateState());
      }
    }
    if (user) {
      switch (true) {
        case user.type === "skilled worker":
          dispatch(getSWExtra(user._id));
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
  }, [user, router, successful, response, dispatch]);

  //sign up submit handler
  const submitHandler = async (values: signUpDetails) => {
    await dispatch(signUp(values));
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          //if (values.emailVerificationCode === verificationCode) {
          const msg = await submitHandler(values);

          res(msg);
          // } else {
          //   setMsg("Invalid email verification code");
          //   setColor("error");
          //   const refState = snackBarRef.current as any;
          //   refState.handleClick();
          //   res("");
          //}
        })
        .catch((err: any) => {
          res(err);
        });
    });
  };

  const signupSchema = object({
    email: string().email("invalid email").required("Email is required"),
    // emailVerificationCode: string().required(
    //   "Email verification code is required"
    // ),
    phone: string()
      .min(11, "Phone can not be less than 11 digits")
      .max(11, "Phone can not be more than 11 digits")
      .required("Phone is required"),
    password: string().required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password"), ""], "Both Passwords must match")
      .required("Confirm Password is required"),
    tc: boolean()
      .isTrue("Please agree to Terms & Conditions")
      .required("Agreeing to terms and conditions is required"),
  });

  const signUpFormControls: FormControls[] = [
    {
      name: "email",
      label: "Email",
      control: "input",
      emailVerificationCode: verificationCode,
    },
    // {
    //   name: "emailVerificationCode",
    //   label: "Email Verification Code",
    //   control: "input",
    // },
    {
      name: "phone",
      label: "Phone Number",
      control: "verifyPhone",
      type: "phone",
    },
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
    {
      name: "tc",
      label: (
        <Link href="/t&c">
          by signing up, you agree to the terms and conditions
        </Link>
      ),
      control: "switch",
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
      <FormikContainer formParams={formParams} />
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
    </>
  );
}
