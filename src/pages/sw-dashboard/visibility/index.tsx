import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import { Bronze } from '../../../swDashboard/components/visibility/bronze'
import { Gold } from '@/swDashboard/components/visibility/gold'
import { Platinium } from '@/swDashboard/components/visibility/platinium'
import Layout from '@/components/dashboard/layout'

export default function VisibilityPage() {
  return (
    <Layout>
<Card>
        <CardHeader title='Select Your Package'/>
        <CardContent>
            <Platinium/>
            <Gold/>
            <Bronze/>
        </CardContent>
    </Card>
    </Layout>
    
  )
}
