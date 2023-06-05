import { useState } from "react";
import RadioButtonGroup from "../radioButtonGroup";
import PayPal from "./paypal";
import Stripe from "./stripe";
import TransferForJobPaymentForm from "./TransferForJobPaymentForm";
import {Box} from '@mui/material'

export default function PaymentForJob({jobId}:{jobId:string}){
    const [method,setMethod] = useState('')
    const setValue = (value:string)=>{
        setMethod(value)
    }

    return(
        <Box sx={{margin:'1rem'}}>
            <TransferForJobPaymentForm jobId={jobId}/>
            {/* <RadioButtonGroup radios={['Bank Transfer','Stripe','Paypal']} setTypeValue={(val)=>{setValue(val)}}/>
           {method === 'Bank Transfer' ?  : 
                (method === 'Paypal' ? <PayPal/> : <Stripe/>)
           } */}
        </Box>
    )
}