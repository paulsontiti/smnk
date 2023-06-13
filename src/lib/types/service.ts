import axios from "axios";
import { array, object, string } from "yup";
import { NextRouter } from "next/dist/client/router";
import { Dispatch, MutableRefObject, SetStateAction} from "react";
import { AlertColor } from "@mui/material";


export type Service = {
  _id?: string;
  title: string;
  skills: string[];
  description: string;
  category: string;
};

export interface SnackBarParams{
  setMsg:Dispatch<SetStateAction<string>>,
  setColor:Dispatch<SetStateAction<AlertColor>>,
  snackBarRef:MutableRefObject<undefined>
}

export const serviceSubmitHandler = async (
  values: Service,
  router: NextRouter,
  snackbarParams:SnackBarParams,
  index?: number,
) => {
  //get user from local storage
  let user = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("user")))
  );

  if (index !== undefined) {
    user.services[index] = values;
  } else {
    //add service to user if user services is not more than two
    if (user.services.length < 2) {
      user.services.push(values);
    } else {
     snackbarParams.setMsg("You cannot add more than two services");
     snackbarParams.setColor("error");
      const refState = snackbarParams.snackBarRef.current as any;
      refState.handleClick();
      return;
    }
  }

  //save the new user details in the localstorage
  localStorage.setItem("user", JSON.stringify(user));

  //save to the database
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/service/edit-service`,
      data: { _id: user._id, services: user.services },
    });
    const data = await res.data;

    if (data.successful) {
      snackbarParams.setMsg(data.message);
     snackbarParams.setColor("success");
      const refState = snackbarParams.snackBarRef.current as any;
      refState.handleClick()
     setTimeout(()=>{
      router.push("/sw-dashboard/service");
     },2000)
    }else{
      snackbarParams.setMsg(data.message);
      snackbarParams.setColor("error");
       const refState = snackbarParams.snackBarRef.current as any;
       refState.handleClick()
    }
  } catch (err: any) {
    console.log(err);
    snackbarParams.setMsg(err.response.data.message);
    snackbarParams.setColor("error");
     const refState = snackbarParams.snackBarRef.current as any;
     refState.handleClick()
  }
};

export const serviceDetailsSchema = object({
  title: string().required("Title is required"),
  description: string()
    .max(200, "Service Description should not be more than 200 characters")
    .required("Service Description is required"),
  category: string().required("Category is required"),
});



