import { useState } from "react";
import RadioButtonGroup from "../radioButtonGroup";
import SMNKBankDetails from "./smnkBankDetais";
import PayPal from "./paypal";
import Stripe from "./stripe";

export default function Payment(){

    const [method,setMethod] = useState('')
    const setValue = (value:string)=>{
        setMethod(value)
    }

    return(
        <>
            <RadioButtonGroup radios={['Bank Transfer','Stripe','Paypal']} setTypeValue={(val)=>{setValue(val)}}/>
           {method === 'Bank Transfer' ? <SMNKBankDetails/> : 
                (method === 'Paypal' ? <PayPal/> : <Stripe/>)
           }
        </>
    )
}