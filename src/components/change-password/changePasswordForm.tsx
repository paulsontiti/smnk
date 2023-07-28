import { useRouter } from "next/router";
import axios from "axios";
import { object, ref, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import FormikContainer from "../form/formikContainer";
import { FormControls, FormParams, createFormObject } from "@/lib/form";
import SnackbarComponent from "../snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { changePassword, updateState } from "@/store/slices/userSlice";

const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user, response, successful } = useSelector(
    (state: RootState) => state.users
  );
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");

  //declare refs
  const snackBarRef = useRef();

  //sign up submit handler
  const submitHandler = async (values: {
    oldPassword: string;
    password: string;
    userId: string;
  }) => {
    await dispatch(changePassword(values));
  };
  useEffect(() => {
    if (response) {
      if (successful) {
        setMsg(response);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        setTimeout(() => {
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
        }, 2000);
      } else {
        setMsg(response);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
      }
    }

    dispatch(updateState());
  }, [user, router, successful, response, dispatch]);

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    values.userId = user._id;
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
          setLoading(false);
          res(err);
          console.log(err);
        });
    });
  };

  const changePasswordSchema = object({
    oldPassword: string().required("Old Password is required"),
    password: string().required("New Password is required"),
    confirmPassword: string()
      .oneOf(
        [ref("password"), ""],
        "New Password must match with Confirm Password"
      )
      .required("Confirm Password is required"),
  });

  const changePasswordFormControls: FormControls[] = [
    {
      name: "oldPassword",
      label: "Old Password",
      control: "input",
      type: "password",
    },
    {
      name: "password",
      label: "New Password",
      control: "input",
      type: "password",
    },
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
      changePasswordSchema,
      initialValues,
      changePasswordFormControls
    ),
    buttonLabel: "Change Password",
    headerTitle: "Change Your Password",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
