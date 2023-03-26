
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";

import { RootState} from '@/store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from "next/router";
import { Service, addEditService, serviceDetailsSchema } from "@/lib/types/service";



export default function AddServiceForm(){

  const router = useRouter()
  

  const {_id} = useSelector((state:RootState)=>state.users.user)
      
  const initialValues :Service={
      title:'',
      skills:[''],
      description:'',
      category:'',
      userId:_id,
      
    }

    
  //add experience submit handler
  const submitHandler = async (values:Service)=>{
    values.userId= _id
    if(values.skills.length < 1){
      alert('Add at least a skill')
      return
    }else{
      if(_id){
        const data:any = await addEditService(values,axios,'add-service')
        
        if(data.isServiceAdded){
          alert(data.message)
          router.push('/sw-dashboard/service')
        }else{
          alert(data.message)
          return
        }
        
      }else{
        alert('Bad request!!!! No user id')
      } 
    }
   //return  console.log(values)
                                          
}
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await submitHandler(values)
              res(msg)
          }).catch((err:any)=>{
            console.log('Error from formik ',err)
            res(err)
          })              
    })

  }


    return(
        <Formik initialValues={initialValues} onSubmit={formikSubmitHandler} validationSchema={serviceDetailsSchema}>
            
        {({values,errors,touched,isSubmitting,isValidating}) => (
         <Form>
           
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='title' as={TextField} label="Title"/>
                 <ErrorMessage name="title"/>
             </FormGroup>
             </Box>
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='skills[0]' as={TextField} label="Skill One"/>
                 <ErrorMessage name="skills[0]"/>
             </FormGroup>
             </Box>
             
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='skills[1]' as={TextField} label="Skill Two"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='category' as={TextField} label="Category"/>
             <ErrorMessage name="category"/>
             </FormGroup>
            </Box>
            
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
             <ErrorMessage name="description"/>
             </FormGroup>
             </Box>
            
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Add Service</Button>
             
        
         </Form>
        )}
         
       </Formik>
    )
}