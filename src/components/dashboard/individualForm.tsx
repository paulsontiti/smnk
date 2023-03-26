
import { Box, FormGroup, TextField ,Button} from "@mui/material";
import { Field, Form, Formik ,ErrorMessage} from "formik";
import {object,string} from 'yup'
import { RootState } from '@/store';
import { useSelector} from 'react-redux';
import { useState} from "react";
import { IndividualPersonalInfo, LGA, State } from "@/lib/types/userInfo";
import axios from "axios";


   
export default function IndividualForm({router}:{router:any}){

  const {user} = useSelector((state:RootState)=>state.users)

  const [lgas,setLgas] = useState<LGA[]>([])
  const [state,setState] = useState<State>({id:1, name:'Abia',
                                                  lgas:[{id:1,name:'Abia North'},
                                                  {id:2,name:'Abia South'},{id:3,name:'Abia East'}]})

  const states=[
    {id:1, name:'Abia',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:2, name:'Adamawa',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:3, name:'Akwaibom',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]}
  ]

  
    
const individualInfoSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    userName: string().required('Username is required'),
    address: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().min(200,'Description should be at least 200 characters').required('Description is required'),
  })


      
  const individualValues :IndividualPersonalInfo={
      firstName:'',
      lastName:'',
      userName:'',
      state:'',
      lga:'',
      address:'',
      description:'',
      userId: user._id,
    }

    
  //sign up submit handler
  const submitHandler = async (values:IndividualPersonalInfo)=>{

    if(user){
        try{
          const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/personal-info/add-personal-info`,
                data:values
            })
          const data = await res.data
            alert(data.message)
            if(data.info){
              router.push('/dashboard/personal-info')
            }
            
          }catch(err:any){
            alert(err.response.data.message)
            return 
          }
    }else{
      alert('Bad request!!!! No user id')
    }                                        
}

const handleStateChange = (e:any)=>{
 setState(e.target.value.name)
  const stateLgas  = states.find((s)=> s.name === e.target.value)?.lgas
  stateLgas && setLgas(stateLgas)
}
  
  //formik submit handler
  const formikSubmitHandler = (values:any,formikHelpers:any)=>{
  
    return new Promise(res=>{
          formikHelpers.validateForm().then(async (data:any)=>{
              const msg = await submitHandler(values)
              res(msg)
          }).catch((err:any)=>{
            alert(err)
            res(err)
          })              
    })

  }


    return(
        <Formik initialValues={individualValues} onSubmit={formikSubmitHandler} validationSchema={individualInfoSchema}>
            
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
             <Field name='address' as={TextField} label="Address"/>
             <ErrorMessage name="address"/>
             </FormGroup>
             </Box>
             <Box  marginBottom={2}>
             <FormGroup>
             <Field name='description' as={TextField} multiline minRows={10} label="Description"/>
             <ErrorMessage name="description"/>
             </FormGroup>
             </Box>
            
             <Button variant="contained" fullWidth type="submit" disabled={isSubmitting || isValidating}>Add</Button>
             
         {/* <pre>{JSON.stringify(errors,null,4)}</pre> */}
        
         </Form>
        )}
         
       </Formik>
    )
}