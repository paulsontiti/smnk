import ProposalComponent from '@/c-dashboard/components/proposal/ProposalComponent'
import Layout from '@/components/dashboard/layout'
import { useRouter } from 'next/router'
import React from 'react'

function ProposalsPage() {

  const router = useRouter()
  const id = router.query.jobId as string
  return (
    <Layout>
        <ProposalComponent id={id}/>
    </Layout>
  )
}

export default ProposalsPage