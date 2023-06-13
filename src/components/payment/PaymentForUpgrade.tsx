import { useState } from "react";
import RadioButtonGroup from "../radioButtonGroup";
import PayPal from "./paypal";
import Stripe from "./stripe";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import TransferForUpgradePaymentForm from "./TransferForUpgradePaymentForm";
import {Container} from '@mui/material'


export default function PaymentForUpgrade({packageName}:{packageName:string}){

    const {_id} = useSelector((state:RootState)=> state.users.user)

    const [method,setMethod] = useState('')
    const setValue = (value:string)=>{
        setMethod(value)
    }

    return(
        <Container sx={{p:{xs:'1rem',md:'2rem 15rem',lg:'2rem 20rem',xl:'2rem 25rem'}}}>
            <RadioButtonGroup radios={['Bank Transfer']} setTypeValue={(val)=>{setValue(val)}}/>
            <TransferForUpgradePaymentForm packageName={packageName}/> 
           {/* {method === 'Bank Transfer' ? 
                //(method === 'Paypal' ? <PayPal/> : <Stripe/>)
           } */}
        </Container>
    )
}