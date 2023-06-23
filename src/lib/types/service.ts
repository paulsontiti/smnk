import axios from "axios";
import { array, object, string } from "yup";
import { NextRouter } from "next/dist/client/router";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { AlertColor } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export type Service = {
  _id?: string;
  title: string;
  skills: string[];
  description: string;
  category: string;
};

export interface SnackBarParams {
  setMsg: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<AlertColor>>;
  snackBarRef: MutableRefObject<undefined>;
}

export const serviceSubmitHandler = async (
  _id: string,
  values: Service,
  router: NextRouter,
  snackbarParams: SnackBarParams,
  index?: number
) => {
  //get swExtra from local storage
  let swExtra = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
  );

  if (index !== undefined) {
    swExtra.services[index] = values;
  } else {
    //check is services is null
    if (swExtra.services) {
      //add service to user if user services is not more than two
      if (swExtra.services.length < 2) {
        swExtra.services.push(values);
      } else {
        snackbarParams.setMsg("You cannot add more than two services");
        snackbarParams.setColor("error");
        const refState = snackbarParams.snackBarRef.current as any;
        refState.handleClick();
        return;
      }
    } else {
      swExtra.services = [];
      swExtra.services.push(values);
    }
  }



  //save to the database
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/service/edit-service`,
      data: { userId: _id, services: swExtra.services },
    });
    const data = await res.data;

    if (data.successful) {
        //save the new user details in the localstorage
  localStorage.setItem("swExtra", JSON.stringify(swExtra));
      snackbarParams.setMsg(data.message);
      snackbarParams.setColor("success");
      const refState = snackbarParams.snackBarRef.current as any;
      refState.handleClick();
      setTimeout(() => {
        router.push("/sw-dashboard/service");
      }, 2000);
    } else {
      snackbarParams.setMsg(data.message);
      snackbarParams.setColor("error");
      const refState = snackbarParams.snackBarRef.current as any;
      refState.handleClick();
    }
  } catch (err: any) {
    console.log(err);
    snackbarParams.setMsg(err.response.data.message);
    snackbarParams.setColor("error");
    const refState = snackbarParams.snackBarRef.current as any;
    refState.handleClick();
  }
};

export const serviceDetailsSchema = object({
  title: string().required("Title is required"),
  description: string()
    .max(200, "Service Description should not be more than 200 characters")
    .required("Service Description is required"),
  category: string().required("Category is required"),
});
