import Layout from '@/components/dashboard/layout'
import { BankDetails } from '@/lib/types/bank-details'
import axios from 'axios'
import { useRouter } from 'next/router'
import React,{useEffect,useState} from 'react'
import {Box} from '@mui/material'
import UserBankDetails from '@/components/pay-sw'

function TipSkilleWorker() {
    const router = useRouter()
    const id = router.query.userId as string

    

  return (
    <Layout>
        <UserBankDetails userId={id}/>
    </Layout>
  )
}

export default TipSkilleWorker