import CorrectionForm from '@/components/correction/CorrectionForm'
import Layout from '@/components/dashboard/layout'
import { RedirectUser } from '@/lib/utils/urls'
import { RootState } from '@/store'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

function CorrectionsPage() {
    const {user} = useSelector((state:RootState)=>state.users)

    const router = useRouter()
    const id = router.query.jobId as string
  return (
    <Layout>
        <CorrectionForm jobId={id} senderId={user._id} url={RedirectUser(user)}/>
    </Layout>
    
  )
}

export default CorrectionsPage