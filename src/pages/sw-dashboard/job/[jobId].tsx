import Layout from '@/components/dashboard/layout'
import { RootState } from '@/store'
import ApplyJobForm from '@/swDashboard/components/job/ApplyJobForm'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

function ApplyForJobPage() {
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const router = useRouter()

    const id = router.query.jobId as string
  return (
    <Layout>
        <ApplyJobForm userId={_id} jobId={id}/>
    </Layout>
  )
}

export default ApplyForJobPage