import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { jobSchema } from "@/lib/types/job";
import FormikContainer from "@/components/form/formikContainer";
import { FormControls, FormParams, createFormObject, states } from "@/lib/form";
import { JobDetails } from "@/lib/job";
import { useEffect, useRef, useState } from "react";
import { createSetFromArray, fetchTalents } from "@/lib/search";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { AlertColor } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const validateDate = (startDate: Date, endDate: Date) => {
  return endDate > startDate && new Date(startDate) > new Date() && new Date(endDate) > new Date() ;
};
export default function JobForm({
  initialValues,
}: {
  initialValues: {details:JobDetails,jobId:string};
}) {
  const [jobCategoryOptions, setJobCategoryOption] = useState<string[]>();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const {_id} = useSelector((state:RootState)=>state.users.user)

  //declare refs
  const snackBarRef = useRef();

  useEffect(() => {
    (async () => {
      const data = await fetchTalents();
      setJobCategoryOption(createSetFromArray(data));
    })();
  }, []);

   const createJobSubmitHandler = async (values:any)=>{
    //return console.log(values)
      if(_id){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/c-dashboard/job/create-job`,
              data:{jobDetails:values}
          })
          const data = await res.data
          
          if(data.isJobAdded){
            setMsg(data.message);
            setColor("success");
            const refState = snackBarRef.current as any;
            refState.handleClick();
           setTimeout(()=>{
            router.push('/c-dashboard/job')
           },6000)
          }else{
            setMsg(data.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            return
          }
          
        }else{
          setMsg('Bad request!!!! No user id');
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        } 
  }
 const editJobSubmitHandler = async (values:any)=>{
    //return console.log(values)
      if(_id){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/c-dashboard/job/edit-job`,
              data:{jobDetails:values,jobId:initialValues.jobId}
          })
          const data = await res.data
          
          if(data.isJobEdited){
            setMsg(data.message);
            setColor("success");
            const refState = snackBarRef.current as any;
            refState.handleClick();
           setTimeout(()=>{
            router.push('/c-dashboard/job')
           },6000)
          }else{
            setMsg(data.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
         
            return
          }
          
        }else{
          setMsg('Bad request!!!! No user id');
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        } 
  }

  const typeOptions = [
    { label: "Physical", value: "physical"},
    { label: "Online", value: "online" },
  ];


  //formik submit handler
  const formikSubmitHandler = (
    values: JobDetails,
    { validateForm }: FormikHelpers<JobDetails>
  ) => {
    return new Promise((res) => {
      if (validateDate(values.startDate, values.endDate)) {
        validateForm()
          .then((data: any) => {
            initialValues.jobId ? editJobSubmitHandler(values) : createJobSubmitHandler(values);
            res(data);
          })
          .catch((err: any) => {
            setMsg('An error occurred while filling the form');
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            res(err);
          });
      } else {
        setMsg("Your End date should be greater than your Start Date and Both dates should be after yesterday");
        setColor("error");
        const refState = snackBarRef.current as any;
        refState.handleClick();
        res("");
      }
    });
  };

  const jobFormControls: FormControls[] = [
    {
      name: "title",
      label: "Title",
      control: "input",
      required: true,
      helperText: "Title of your job",
    },
    
    {
      name: "type",
      label: "Type Of Job",
      control: "radio",
      options: typeOptions,
      checkedValue:'physical'
    },
    {
      name: "category",
      label: "Category",
      control: "freesolo",
      options: jobCategoryOptions,
      required: true,
      helperText: "Category of your job",
    },
    {
      name: "description",
      label: "Description",
      control: "textarea",
      required: true,
      helperText: "Describe what you want to be done for you",
    },
    {
      name: "budget",
      label: "Budget",
      control: "number",
      required: true,
      helperText: "How much are you willing to pay for the job",
    },
    {
      name: "state",
      label: "State",
      control: "auto",
      options: states,
      fieldToCheckAgainst: "type",
      helperText: "Which State will the job be done",
      valueOfFieldToCheckAgainst: "online",
    },
    {
      name: "lga",
      label: "L.G.A",
      control: "auto",
      options: states,
      fieldToCheckAgainst: "state",
      helperText: "Which L.G.A is the location",
      valueOfFieldToCheckAgainst: "",
    },
    {
      name: "address",
      label: "Address",
      control: "input",
      fieldToCheckAgainst: "type",
      valueOfFieldToCheckAgainst: "online",
      helperText: "What address will the job take place?",
    },
    { name: "startDate", label: "Start Date", control: "date" },
    { name: "endDate", label: "End Date", control: "date" },
    {
      name: "agreeToTerms",
      label: <Link href={'/t&c'}>I agree to terms & conditions</Link>,
      control: "switch",
    },
  ];

  const formParams: FormParams = {
    formObject: createFormObject(
      formikSubmitHandler,
      jobSchema,
      initialValues.details,
      jobFormControls
    ),
    buttonLabel: "Submit",
    headerTitle: "Provide Your Job Details",
  };

  return (
    <>
    <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
      <FormikContainer formParams={formParams} />
    </>
  );
}
