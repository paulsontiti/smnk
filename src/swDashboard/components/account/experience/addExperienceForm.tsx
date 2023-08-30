import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import { NextRouter } from "next/router";
import {
  Experience,
  expDetailsSchema,
  expFormControls,
} from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import axios from "axios";
import { updateSWExtra } from "@/store/slices/swExtraSlice";

export default function AddExperienceForm({ router }: { router: NextRouter }) {
  const [loading, setLoading] = useState(false);
  const { _id } = useSelector((state: RootState) => state.users.user);
  const [initialValues, setInitialValues] = useState<Experience>({
    title: "",
    company: "",
    state: "",
    lga: "",
    address: "",
    description: "",
    startDate: new Date(),
    onRole: false,
  });
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

  //declare refs
  const snackBarRef = useRef();
  //submit handler
  const experienceSubmitHandler = async (
    values: Experience,
    router: any,
    index?: number
  ) => {
    //get swExtra from local storage
    let swExtra = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
    );

    if (swExtra) {
      //if index that means we are editing experience else we are adding an experience

      if (!swExtra.experience) {
        swExtra.experience = [];
        swExtra.experience.push(values);
      } else {
        swExtra.experience.push(values);
      }
      //save to the database
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/sw-dashboard/experience/edit-experience`,
          data: { experience: swExtra.experience, userId: _id },
        });
        const data = await res.data;

        if (data.successful) {
          //save the new user details in the localstorage
          localStorage.setItem("swExtra", JSON.stringify(swExtra));
          dispatch(updateSWExtra());
          setMsg(data.message);
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.push("/sw-dashboard/experience");
          }, 3000);
        } else {
          setMsg(data.message);
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        console.log(err);
        setMsg(err.response.data.message);
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        return;
      }
    }
  };

  //formik submit handler
  const formikSubmitHandler = (values: any, formikHelpers: any) => {
    setLoading(true);
    setInitialValues(values);
    return new Promise((res) => {
      formikHelpers
        .validateForm()
        .then(async (data: any) => {
          if (!values.onRole && new Date(values.endDate) > new Date()) {
            setMsg("End Date can not be after today");
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            setLoading(false);
            res("");
            return;
          }
          if (new Date(values.startDate) > new Date()) {
            setMsg("Start Date can not be after today");
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            setLoading(false);
            res("");
            return;
          }

          const msg = await experienceSubmitHandler(values, router);
          setLoading(false);
          res(msg);
        })
        .catch((err: any) => {
          setMsg("Oops!!! Something wrong happened. Please try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          console.log("Error from formik ", err);
          setLoading(false);
          res(err);
        });
    });
  };

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      expDetailsSchema,
      initialValues,
      expFormControls
    ),
    buttonLabel: "Add Experience",
    headerTitle: "Create Your Experience",
  };
  return (
    <>
      <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} loading={loading} />
    </>
  );
}
