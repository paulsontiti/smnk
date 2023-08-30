import { number, object, string } from "yup";
import { NextRouter } from "next/dist/client/router";
import axios from "axios";
import { FormControls } from "../form";
import { SWExtra, User } from "./userInfo";
import { SnackBarParams } from "./service";

export type BankDetails = {
  accountName: string;

  accountNumber: string;
  bankName: string;
};

export const bankDetailsSubmitHandler = async (
  userId:string,
  values: BankDetails,
  router: NextRouter,  snackbarParams:SnackBarParams
) => {
    //get swExtra from local storage
    let swExtra:SWExtra = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem("swExtra")))
    );
    
    swExtra.bankDetails = values
    
  
    
    //save to the database
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/sw-dashboard/bank-details/edit-bank-details`,
      data: {bankDetails:swExtra.bankDetails,userId}
    });
    const data = await res.data;
    if (data.successful) {
        //save the new user details in the localstorage
    localStorage.setItem("swExtra", JSON.stringify(swExtra));
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
export const banks = [
  "Access Bank",
  "Citibank Nigeria",
  "Coronation Merchant Bank",
  "Ecobank Nigeria",
  "FBNQuest Merchant Bank",
  "Fidelity Bank Nigeria",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "FSDH Merchant Bank",
  "Guaranty Trust Bank",
  "Globus Bank ",
  "Heritage Bank",
  "Jaiz Bank Plc",
  "Keystone Bank",
  "Nova Merchant Bank",
  "Polaris Bank",
  "Providus Bank",
  "Rand Merchant Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank Nigeria",
  "Sterling Bank",
  "SunTrust Bank Nigeria ",
  "TAJBank ",
  "Titan Trust Bank ",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank"
]
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
  { name: "bankName", label: "Bank Name", control: "freesolo",options:banks },
];
