
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { RootState,AppDispatch } from '@/store';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { editUserInfo } from "@/store/slices/userSlice";

type LGA = {
  id:number
  name:string
}
type State = {
  id:number
  name:string,
  lgas:LGA[]
}
   
export default function EditPersonalIndividualInfoForm({router,type}:{router:any,type:string}){

  const {info,editedInfoDetails} = useSelector((state:RootState)=>state.users)
  const {_id} = useSelector((state:RootState)=>state.users.user)
  const dispatch = useDispatch<AppDispatch>()

  const [lgas,setLgas] = useState<LGA[]>([])
  const [state,setState] = useState('')

  useEffect(()=>{
    if(editedInfoDetails && editedInfoDetails.isInfoEdited){
      router.push('/sw-dashboard/personal-info')
    }
  },[editedInfoDetails,router])

  
  

  const states=[
    {id:1, name:'Abia',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:2, name:'Adamawa',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:3, name:'Akwaibom',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]}
  ]
  
    
const individualInfoSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    userName: string().required('Username is required'),
    street: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().min(200,'Description should be at least 200 characters').required('Description is required'),
  })

  type InitialValues ={
    firstName:string,
    lastName:string,
    userName:string,
    state:string,
    lga:string,
    street:string,
    description:string,
    type:string
  }


  type submitValues ={
    firstName:string,
    lastName:string,
    userName:string,
   address:{
    state:string,
    lga:string,
    street:string
   },
    description:string,
    userId:string,
    type:string
  }
      
  const individualValues :InitialValues={
                                            firstName:info && info.firstName,
                                            lastName:info && info.lastName,
                                            userName:info && info.userName,
                                            state:info && info.address && info.address.state,
                                            lga:info && info.address && info.address.lga,
                                            street:info && info.address && info.address.street,
                                            description:info && info.description,
                                            type
                                        }

    
  //sign up submit handler
  const submitHandler = async (values:InitialValues)=>{
    const submitValues : submitValues = {
                                            firstName:values.firstName,
                                            lastName:values.lastName,
                                            userName:values.userName,
                                            description:values.description,
                                            address:{
                                                        state: values.state,
                                                        lga: values.lga,
                                                        street: values.street
                                                      },
                                              type:info.type,
                                              userId:_id
                                        }
    if(_id){
      await dispatch(editUserInfo(submitValues))
    }else{
      alert('Bad request!!!! No user id')
    } 
    
}

// const handleStateChange = (e:any)=>{
//  setState(e.target.value.name)
//   const stateLgas  = states.find((s)=> s.name === e.target.value)?.lgas
//   stateLgas && setLgas(stateLgas)
// }
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await submitHandler(values)
              res(msg)
          }).catch((err:any)=>{
            alert(err)
          })              
    })

  }


    return(
      
           <Formik 
                initialValues={individualValues} 
                onSubmit={formikSubmitHandler} 
                validationSchema={individualInfoSchema}
                
        >
            
        {({values,errors,touched,isSubmitting,isValidating}) => (
         <Form>
           
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='firstName' as={TextField} label="First Name"/>
                 <ErrorMessage name="firstName"/>
             </FormGroup>
             </Box>
             <Box marginBottom={2}  marginTop={2}>
             <FormGroup>
                 <Field name='lastName' as={TextField} label="Last Name"/>
                 <ErrorMessage name="lastName"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='userName' as={TextField} label="User Name"/>
             <ErrorMessage name="userName"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='state' as={TextField} select label="State">
                  {states.map((value)=>(
                      <option key={value.id} selected={value.name === (info && info.address && info.address.state)} value={value.name}>{value.name}</option>
                  ))}
                  
             </Field>
             <ErrorMessage name="state"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='lga' as={TextField} select label="L.G.A" >
                  {states[0].lgas.map((value)=>(
                          <option key={value.id} selected={value.name === (info && info.address && info.address.lga)} value={value.name}>{value.name}</option>
                      ))}
             </Field>
             <ErrorMessage name="lga"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='street' as={TextField} label="Street"/>
             <ErrorMessage name="street"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
             <ErrorMessage name="description"/>
             </FormGroup>
             </Box>
             
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Edit Info</Button>
             
         {/* <pre>{JSON.stringify(values,null,4)}</pre> */}
        
         </Form>
        )}
         
       </Formik>
      
    )
}