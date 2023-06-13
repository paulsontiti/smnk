import { number, object, string } from "yup";
import { NextRouter } from "next/dist/client/router";
import axios from "axios";
import { FormControls } from "../form";
import { User } from "./userInfo";
import { SnackBarParams } from "./service";

export type BankDetails = {
  accountName: string;

  accountNumber: string;
  bankName: string;
  userId: string;
};

export const bankDetailsSubmitHandler = async (
  values: BankDetails,
  router: NextRouter,  snackbarParams:SnackBarParams
) => {
    //get user from local storage
    let user:User = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem("user")))
    );
    
   user.bankDetails = values
    
    //save the new user details in the localstorage
    localStorage.setItem("user", JSON.stringify(user));
    
    //save to the database
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/bank-details/edit-bank-details`,
      data: {bankDetails:user.bankDetails,_id:user._id}
    });
    const data = await res.data;
    if (data.successful) {
      snackbarParams.setMsg(data.message);
     snackbarParams.setColor("success");
      const refState = snackbarParams.snackBarRef.current as any;
      refState.handleClick()
     setTimeout(()=>{
      router.push("/sw-dashboard/bank-details");
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

export const bankDetailsSchema = object({
  accountName: string().required("Account Name is required"),
  accountNumber: string()
    .min(10, "Account Number can not be less than 10 numbers")
    .max(10, "Account Number can not be more than 10 numbers")
    .required("Account Number is required"),
  bankName: string().required("Bank Name is required"),
});

export const bankDetailsFormControls: FormControls[] = [
  { name: "accountName", label: "Account Name", control: "input" },
  { name: "accountNumber", label: "Account Number", control: "input" },
  { name: "bankName", label: "Bank Name", control: "input" },
];
