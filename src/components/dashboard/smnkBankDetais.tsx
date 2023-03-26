
import { Box, FormGroup, TextField,Grid, Typography ,Card,CardHeader,CardActions, Button, CardContent} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Field,FastField, Form, Formik ,ErrorMessage} from "formik";
import {date, number, object,string} from 'yup'
import {useSelector} from "react-redux";
import { RootState } from "@/store";
import {useEffect} from 'react'

type PaymentDetails = {
    bankName:string,
    accountName:string
    amount:number,
    dop:Date
}

export default function SMNKBankDetails(){
    const router = useRouter() 
  
    const {user} = useSelector((state:RootState)=>state.users)
  
    const paymentSchema = object({
                                bankName: string().required('Your bank name is required'),
                                accountName: string().required('Your bank account name is required'),
                                amount: number().required('Amount Paid is required'),
                                dop: date().required('Date of Payment is required'),
                              })

    const initialValues: PaymentDetails ={} as PaymentDetails

  //payment submit handler
  const submitHandler = async (values:PaymentDetails)=>{

  }
  
  
    // useEffect(()=>{
    //   if(user){
    //     if(user.type === 'Skilled Worker'){
    //       router.push('/sw-dashboard')
    //     }else if(user.type === 'Client'){
    //       router.push('/c-dashboard')
    //     }
    //   }
    //   else{
    //     router.push('/account/login')
    //   }
    // },[user,router])

    const formikOnSubmitHandler = (values:PaymentDetails,formikHelpers:any)=>{

        return new Promise(res=>{
            formikHelpers.validateForm().then(async (data:any)=>{
            const msg = await submitHandler(values)
            res(msg)
            }).catch((err:any)=>{
            res(err)
            })              
        })

        }


    return(
        <Card>
            
                <CardContent>
                <Typography sx={{fontWeight:'bold',marginBottom:5,marginTop:5}}>SMNK Bank Details</Typography>
                    <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="body2">Account Name: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{marginBottom:3}}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>Smnk Nigeria Limited</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Account Number: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{marginBottom:3}}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>09236457218</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Bank Name: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{fontWeight:'bold'}}>Access Bank</Typography>
                            </Grid>
                    </Grid>
                    <Box sx={{marginTop:10}}>
                        <Typography sx={{fontWeight:'bold'}}>Please Provide Transfer Details</Typography>
                    <Formik initialValues={initialValues} onSubmit={formikOnSubmitHandler} validationSchema={paymentSchema}>

{({values,errors,touched,isSubmitting,isValidating}) => (
<Form>
    <Box marginBottom={2}  marginTop={2}>
    <FormGroup>
        <FastField  name='bankName' as={TextField} label="Bank Name"/>
        <ErrorMessage name="bankName"/>
    </FormGroup>
    </Box>
    <Box  marginBottom={2}>
    <FormGroup>
    <Field name='accountName' as={TextField} label="Your Bank Account Name"/>
    <ErrorMessage name="accountName"/>
    </FormGroup>
    </Box>
    <Box  marginBottom={2}>
    <FormGroup>
    <Field type='number' name='amount' as={TextField} label="Amount Paid"/>
    <ErrorMessage name="amount"/>
    </FormGroup>
    </Box>
    <Box  marginBottom={2}>
    <FormGroup>
        <Typography sx={{margin:'1rem 0',paddingLeft:2}}>Date Of Payment</Typography>
    <Field type='date' name='dop' as={TextField} label=""/>
    <ErrorMessage name="dop"/>
    </FormGroup>
    </Box>
    <Box  marginBottom={2}>
    <FormGroup>
    <Typography sx={{margin:'1rem 0'}}>Please Upload proof of Payment</Typography>
    <Field type='file' name='pop' as={TextField}/>
    <ErrorMessage name="pop"/>
    </FormGroup>
    </Box>
<CardActions>
<Button variant="contained" type="submit" fullWidth disabled={isSubmitting || isValidating}>Submit</Button>
</CardActions>
<pre>{JSON.stringify(values,null,4)}</pre>
<pre>{JSON.stringify(errors,null,4)}</pre>
</Form>
)}

</Formik>
                    </Box>
                </CardContent>

            
        </Card>
       
    )
}