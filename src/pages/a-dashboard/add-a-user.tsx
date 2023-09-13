import AdminLayout from "@/admin/components/adminLayout";
import { useState, useRef } from "react";
import { SmnkErrorBoundary } from "../_app";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import FormikContainer from "@/components/form/formikContainer";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { AlertColor } from "@mui/material";
import { signUp } from "@/store/slices/userSlice";
import { object, ref, string } from "yup";
import { FormControls, FormParams, createFormObject } from "@/lib/form";

const AddAUserPage = () => {
  return (
    <AdminLayout>
      <AddAUser />
    </AdminLayout>
  );
};

export default AddAUserPage;
function AddAUser() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  //declare refs
  const snackBarRef = useRef();

  const initialValues = {
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    type: "admin",
    typeClass: "admin",
  };

  //sign up submit handler
  const submitHandler = async (values: any) => {
    await dispatch(signUp(values));
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          //if (values.emailVerificationCode === verificationCode) {
          const msg = await submitHandler(values);
          setMsg("A new admin was created successfully");
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setLoading(false);
          res(msg);
          router.push("/a-dashboard/admins");
          // } else {
          //   setMsg("Invalid email verification code");
          //   setColor("error");
          //   const refState = snackBarRef.current as any;
          //   refState.handleClick();
          //   res("");
          //}
        })
        .catch((err: any) => {
          setLoading(false);
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
  });

  const signUpFormControls: FormControls[] = [
    {
      name: "email",
      label: "Email",
      control: "input",
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
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      signupSchema,
      initialValues,
      signUpFormControls
    ),
    buttonLabel: "Add User",
    headerTitle: "Add Another Admin",
  };

  return (
    <SmnkErrorBoundary>
      <FormikContainer formParams={formParams} loading={loading} />
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
    </SmnkErrorBoundary>
  );
}
