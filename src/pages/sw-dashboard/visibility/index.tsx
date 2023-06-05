
import { Bronze } from '../../../swDashboard/components/visibility/bronze'
import { Gold } from '@/swDashboard/components/visibility/gold'
import { Platinium } from '@/swDashboard/components/visibility/platinium'
import Layout from '@/components/dashboard/layout'
import { Card,CardHeader,CardContent } from '@mui/material'

export default function VisibilityPage() {

  return (
    <Layout>
      <Card>
        <CardHeader title="Upgrade Your Package"/>
        <CardContent>

            <Platinium/>
            <Gold/>
            <Bronze/>
        </CardContent>
      </Card>
    </Layout>
    
  )
}
