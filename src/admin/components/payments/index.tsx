import { JobPaymentDetails, UpgradePaymentDetails, getAllPayments } from '@/lib/payment'
import React from 'react'
import useSWR from 'swr'
import UpgradePaymentsComponent from './upgrade/UpgradePaymentsComponent'
import JobPaymentsComponent from './job/JobPaymentComponent'


function AllPayments() {

    const {data,error} = useSWR('getPayments',getAllPayments())
    
    if(error) return <p>Error occurred</p>

    if(!data) return <p>loading....</p>

  return (
    <>
      {
         data.jobPayments && data.jobPayments.map((payment:JobPaymentDetails)=>(
          <>
            <h2>Job Payments</h2>
            <JobPaymentsComponent key={payment._id} payment={payment}/>
          </>
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