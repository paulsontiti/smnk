
import { NextRouter } from "next/router";
import FormikContainer from "@/components/form/formikContainer";
import { Experience, expDetailsSchema, expFormControls } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateUser } from "@/store/slices/userSlice";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { useRef, useState } from "react";
import { AlertColor } from "@mui/material";
import axios from "axios";

export default function EditExperienceForm({router,index}:{router:NextRouter,index:number}){
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

    //declare refs
    const snackBarRef = useRef();


  const {user:{experience}} = useSelector((state:RootState)=>state.users)
  
  //get the experience to edit
const expObj = experience[index]

//copy nto another experience object
const exp:Experience = {...expObj}

//submit handler
const experienceSubmitHandler = async (
  values: Experience,
  router: any,index?:number
) => {

  //get user from local storage
  let user = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem("user")))
  );
  
  //if index that means we are editing experience else we are adding an experience
  
  if(index !== undefined){
    user.experience[index] = values 
  }else{
     user.experience.push(values)
  }
  
  //save the new user details in the localstorage
  localStorage.setItem("user", JSON.stringify(user));
  
  //save to the database
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/sw-dashboard/experience/edit-experience`,
        data: {experience:user.experience,_id:user._id}
      });
      const data = await res.data;

     
      if (data.successful) {
        setMsg(data.message);
        setColor("success");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        router.push("/sw-dashboard/experience");
      }else{
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
 
};
//formik submit handler
const formikSubmitHandler = (values:any,formikHelpers:any)=>{

  return new Promise(res=>{
    
        formikHelpers.validateForm().then(async (data:any)=>{
          if(!values.onRole && new Date(values.endDate) > new Date()){
            setMsg('End Date can not be after today');
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            res('')
            return
          }
          if(new Date(values.startDate)> new Date()){
            setMsg('Start Date can not be after today');
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            res('')
            return
          }
          const msg = await experienceSubmitHandler(values,router,index)
          dispatch(updateUser())
            res(msg)
        }).catch((err:any)=>{
          setMsg('Oops!!! Something wrong happened. Please try again');
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          console.log('Error from formik ',err)
          res(err)
        })              
  })

}

const formParams:FormParams ={
  formObject : createFormObject(formikSubmitHandler,expDetailsSchema,exp,expFormControls),
  buttonLabel:'Edit Experience',
  headerTitle:'Edit Your Experience'
}
return (
  <>
  <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
    <FormikContainer formParams={formParams} />
  </>
);
}