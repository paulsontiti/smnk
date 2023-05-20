import { useState } from "react";
import RadioButtonGroup from "../radioButtonGroup";
import PayPal from "./paypal";
import Stripe from "./stripe";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import TransferForUpgradePaymentForm from "./TransferForUpgradePaymentForm";


export default function PaymentForUpgrade({packageName}:{packageName:string}){

    const {_id} = useSelector((state:RootState)=> state.users.user)

    const [method,setMethod] = useState('')
    const setValue = (value:string)=>{
        setMethod(value)
    }

    return(
        <>
            <RadioButtonGroup radios={['Bank Transfer','Stripe','Paypal']} setTypeValue={(val)=>{setValue(val)}}/>
           {method === 'Bank Transfer' ? <TransferForUpgradePaymentForm packageName={packageName}/> : 
                (method === 'Paypal' ? <PayPal/> : <Stripe/>)
           }
        </>
    )
}