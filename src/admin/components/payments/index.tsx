import { JobPaymentDetails, UpgradePaymentDetails, getAllPayments } from '@/lib/payment'
import React from 'react'
import useSWR from 'swr'
import AllPaymentsComponent from './job/JobPaymentComponent'
import UpgradePaymentsComponent from './upgrade/UpgradePaymentsComponent'


function AllPayments() {

    const {data,error} = useSWR('getPayments',getAllPayments())
    
    if(error) return <p>Error occurred</p>

    if(!data) return <p>loading....</p>

  return (
    <>
      {
         data.jobPayments && data.jobPayments.map((payment:JobPaymentDetails)=>(
          <AllPaymentsComponent key={payment._id} payment={payment}/>
         ))
      }
        {
          data.upgradePayments && data.upgradePayments.map((payment:UpgradePaymentDetails)=>(
          <>
            <h2>Upgrade Payments</h2>
            <UpgradePaymentsComponent key={payment._id} payment={payment}/>
          </>
         ))
      }
    </>
  )
}

export default AllPayments