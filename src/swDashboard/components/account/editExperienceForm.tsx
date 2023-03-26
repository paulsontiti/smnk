
import { Box, FormGroup, TextField ,Button, Checkbox, FormControlLabel,Typography} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {useState } from "react";
import { LGA, State } from "@/lib/types/userInfo";
import { NextRouter } from "next/router";
import { months, years } from "@/lib/types";
import Experience from "@/lib/types/experience";
import axios from "axios";
import { expDetailsSchema } from "@/lib/utils/exp";


export default function EditExperienceForm({router,initialValues}:{router:NextRouter,initialValues:Experience}){
      const [lgas,setLgas] = useState<LGA[]>([])
    const [state,setState] = useState<State>({id:1, name:'Abia',
                                                    lgas:[{id:1,name:'Abia North'},
                                                    {id:2,name:'Abia South'},{id:3,name:'Abia East'}]})

    const [onRole,setOnRole] = useState(initialValues.onRole)
  
    const states=[
      {id:1, name:'Abia',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
      {id:2, name:'Adamawa',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
      {id:3, name:'Akwaibom',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]}
    ]

      

    
  //add experience submit handler
  const submitHandler = async (values:Experience)=>{
    values.onRole = onRole
    try{
      const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/sw-dashboard/edit-experience`,
            data:values
        })
      const data = await res.data
      
      if(data.isExpEdited){
        alert(data.message)
        
        router.push('/sw-dashboard/experience')
        
      }else{
        alert(data.message)
        return
      }
      
  }catch(err:any){
    alert(err.response.data.message)
    return
  }
                                      
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
      <Formik initialValues={initialValues} onSubmit={formikSubmitHandler} validationSchema={expDetailsSchema}>
            
      {({values,errors,isSubmitting,isValidating}) => (
       <Form>
         
           <Box marginBottom={2}  marginTop={2}>
           <FormGroup>
               <Field name='title' as={TextField} label="Title"/>
               <ErrorMessage name="title"/>
           </FormGroup>
           </Box>
           <Box marginBottom={2}  marginTop={2}>
           <FormGroup>
               <Field name='company' as={TextField} label="Company" />
               <ErrorMessage  name="company"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='state' as={TextField} select label="State">
                {states.map((value)=>(
                        <option key={value.id} value={value.name}>{value.name}</option>
                    ))}
           </Field>
           <ErrorMessage name="state"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='lga' as={TextField} select label="L.G.A">
                {states[0].lgas.map((value)=>(
                        <option key={value.id} value={value.name}>{value.name}</option>
                    ))}
           </Field>
           <ErrorMessage name="lga"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='city' as={TextField} label="City"/>
           <ErrorMessage name="city"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='address' as={TextField} label="Address"/>
           <ErrorMessage name="address"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox 
                        checked={onRole} 
                        onChange={(e:any)=>{
                                              setOnRole(e.target.checked); 
                                            initialValues.onRole = onRole}
                                  }          
                        name="onRole" />
                  }
                  label="I'm currently on this role"
                />
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
            <Typography sx={{fontWeight:'600',marginBottom:2}}>Start Date:</Typography>
           <Field name='startMonth' as={TextField} select label="Month">
                {months.map((value)=>(
                    <option key={value.id}  value={value.name}>{value.name}</option>
                ))}
                
           </Field>
           <ErrorMessage name="startMonth"/>
           </FormGroup>
           </Box>
           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='startYear' as={TextField} select label="Year">
                {years.map((value)=>(
                    <option key={value.id} value={value.value}>{value.value}</option>
                ))}
                
           </Field>
           <ErrorMessage name="startYear"/>
           </FormGroup>
           </Box>
           
           
           <Typography sx={{fontWeight:'600',marginBottom:2}}>End Date:</Typography>
           
           
                  {!onRole ?  <>
                                  <Box  marginBottom={2}>
                                      <FormGroup>
                                          <Field name='endMonth' as={TextField} select label="Month">
                                          {months.map((value)=>(
                                              <option key={value.id} value={value.name}>{value.name}</option>
                                          ))}
                                        
                                          </Field>
                                          <ErrorMessage name="endMonth"/>
                                        </FormGroup>
                                  </Box>
                                  <Box  marginBottom={2}>
                                  <FormGroup>
                                  <Field name='endYear' as={TextField} select label="Year">
                                      {years.map((value)=>(
                                            <option key={value.id} value={value.value}>{value.value}</option>
                                        ))}
                                      
                                  </Field>
                                  <ErrorMessage name="endYear"/>
                                  </FormGroup>
                                  </Box>
           
                              </>: <Typography sx={{fontWeight:'bold',color:'green',marginBottom:2}}>Present</Typography> 
                  }
           

           <Box  marginBottom={2}>
           <FormGroup>
           <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
           <ErrorMessage name="description"/>
           </FormGroup>
           </Box>
          
           <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Edit</Button>
             
       {/* <pre>{JSON.stringify(values,null,4)}</pre>
       <pre>{JSON.stringify(errors,null,4)}</pre> */}
      
       </Form>
      )}
       
     </Formik>
    )
}