import ComplaintForm from '@/components/complaint/ComplaintForm'
import Layout from '@/components/dashboard/layout'
import { RedirectUser } from '@/lib/utils/urls'
import { RootState } from '@/store'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

function ComplaintPage() {
    const {user} = useSelector((state:RootState)=>state.users)

    const router = useRouter()
    const id = router.query.jobId as string
  return (
    <Layout>
        <ComplaintForm jobId={id} url={RedirectUser(user)}/>
    </Layout>
    
  )
}

export default ComplaintPage