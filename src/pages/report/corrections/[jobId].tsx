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

    //id contains jobId and reportId
    const id = router.query.jobId as string
    const ids = id && id.split('-')
  return (
    <Layout>
        <CorrectionForm jobId={ids && ids[0]} reportId={ids && ids[1]} url={RedirectUser(user)}/>
    </Layout>
    
  )
}

export default CorrectionsPage