import Layout from '@/components/dashboard/layout'
import { BankDetails } from '@/lib/types/bank-details'
import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Box} from '@mui/material'

function UserBankDetails({userId}:{userId:string}) {

    const [bankDetails,setBankDetails] = useState<BankDetails>()

    useEffect(()=>{
        (
            async()=>{
                try{
                    if(userId){
                        const res = await axios({
                            method:'GET',
                            url:`${process.env.SMNK_URL}api/bank-details/${userId}`,
                        })
                            const data = await res.data
                            setBankDetails(data)
                        }else{
                            console.log('Invalid request')
                        }                    
                }catch(err:any){
                  console.log(err)
                  return err
                }
            }
        )()
    },[userId])
    if(!bankDetails?.accountName) return <p>No Bank Details</p>

  return (
    <>
        <Box>
            <h4>Bank Name:</h4>
            <p>{bankDetails.bankName}</p>
        </Box>
        <Box>
            <h4>Bank Account Name:</h4>
            <p>{bankDetails.accountName}</p>
        </Box>
        <Box>
            <h4>Bank Account Number:</h4>
            <p>{bankDetails.accountNumber}</p>
        </Box>
    </>
  )
}

export default UserBankDetails