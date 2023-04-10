import { useState } from "react";
import RadioButtonGroup from "../radioButtonGroup";
import PayPal from "./paypal";
import Stripe from "./stripe";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import TransferForJobPaymentForm from "./TransferForJobPaymentForm";

export default function PaymentForJob({jobId}:{jobId:string}){

    const {_id} = useSelector((state:RootState)=> state.users.user)

    const [method,setMethod] = useState('')
    const setValue = (value:string)=>{
        setMethod(value)
    }

    return(
        <>
            <RadioButtonGroup radios={['Bank Transfer','Stripe','Paypal']} setTypeValue={(val)=>{setValue(val)}}/>
           {method === 'Bank Transfer' ? <TransferForJobPaymentForm jobId={jobId} userId={_id}/> : 
                (method === 'Paypal' ? <PayPal/> : <Stripe/>)
           }
        </>
    )
}