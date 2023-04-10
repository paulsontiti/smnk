import Layout from '@/components/dashboard/layout'
import PaymentForJob from '@/components/payment/PaymentForJob'
import { useRouter } from 'next/router'
import React from 'react'

function PaymentPage() {
  const router = useRouter()
  const id = router.query.jobId as string
  return (
    <Layout>
        <PaymentForJob jobId={id}/>
    </Layout>
  )
}

export default PaymentPage