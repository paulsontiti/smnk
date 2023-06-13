
import { AppDispatch, RootState} from '@/store';
import { useDispatch, useSelector} from 'react-redux';

import { NextRouter } from "next/router";
import { Experience, expDetailsSchema, expFormControls } from "@/lib/experience";
import { FormParams, createFormObject } from "@/lib/form";
import FormikContainer from "@/components/form/formikContainer";
import { updateUser } from '@/store/slices/userSlice';
import { useRef, useState } from 'react';
import { AlertColor } from "@mui/material";
import SnackbarComponent from '@/components/snackbar/SnackBar';
import axios from 'axios';



export default function AddExperienceForm({router}:{router:NextRouter}){

  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const dispatch = useDispatch<AppDispatch>();

    //declare refs
    const snackBarRef = useRef();
      
  const initialValues :Experience={
      title:'',company:'',
      state:'',lga:'',address:'',
      description:'',startDate:new Date(),onRole:false
    }
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
            const msg = await experienceSubmitHandler(values,router)
            //update user details in local storage
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
    formObject : createFormObject(formikSubmitHandler,expDetailsSchema,initialValues,expFormControls),
    buttonLabel:'Add Experience',
    headerTitle:'Create Your Experience'
  }
  return (
    <>
    <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
    </>
  );
}