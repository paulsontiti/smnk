import React, { useRef, useState } from 'react'
import FormikContainer from '../form/formikContainer'
import {FormControls, FormParams, createFormObject } from '@/lib/form'
import { object, string } from 'yup'
import {useRouter} from 'next/router'
import { ReportDetails} from '@/lib/report'
import axios from 'axios'
import SnackbarComponent from '../snackbar/SnackBar'
import {AlertColor} from '@mui/material'

function JobReportForm({jobId,url}:{jobId:string,url:string}) {
    
    const router = useRouter()
    const [msg, setMsg] = useState("");
    const [color, setColor] = useState<AlertColor>("error");
  
    //declare refs
    const snackBarRef = useRef();
      //report submit handler
const reportSubmitHandler = async (values:any,router:any,url:string)=>{
    
    try{
                const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/report/create-report`,
                    data:values
                })
                const data = await res.data
                if(data.successful){
                  setMsg(data.message);
                  setColor("success");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                    router.push('/dashboard/job/current')
                }else{
                  setMsg(data.message);
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
                }
  }catch(err:any){
    setMsg(err.message);
                  setColor("error");
                  const refState = snackBarRef.current as any;
                  refState.handleClick();
    return err
  }
}
     //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
    const formData = new FormData()
    
    formData.append('reportFile',values.reportFile) 
    formData.append('report',values.report) 
    formData.append('subject',values.subject) 
    formData.append('jobId',values.jobId) 
    

    return new Promise(res=>{
     
          formikHelpers.validateForm().then(async (data:any)=>{
               reportSubmitHandler(formData,router,url)
              res(data)
          }).catch((err:any)=>{
            setMsg(err.message);
            setColor("error");
            const refState = snackBarRef.current as any;
            refState.handleClick();
            console.log('Error from formik ',err)
            res(err)
          })    
         
    })


}

const initialValues:ReportDetails = {report:'',subject:'',jobId,reportFile:null}
const validationSchema = object({
  report:string().required('Report is required'),
  subject:string().required('Subject is required'),
})

    const reportFormControls:FormControls[] = [
          {name:'subject',label:'Subject',control:'input'},
          {name:'report',label:'Report',control:'textarea'},
          {name:'reportFile',label:'Attatch a file',control:'file',initiaValues:initialValues}
        ]

        const formParams:FormParams ={
          formObject : createFormObject(formikSubmitHandler,validationSchema,initialValues,reportFormControls),
          buttonLabel:'Send',
          headerTitle: `What's Your Report`
        }
        return (
          <>
            <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
            <FormikContainer formParams={formParams} />
          </>
        );
}

export default JobReportForm