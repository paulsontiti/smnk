import EditJob from '@/c-dashboard/components/jobs/EditJob'
import Layout from '@/components/dashboard/layout'
import {useRouter} from 'next/router'
import React,{useEffect} from 'react'

function EditJobPage() {

  const router = useRouter()

  const id = router.query.jobId as string


  return (
    <Layout>
      <EditJob jobId={id}/>
    </Layout>
  )
}

export default EditJobPage