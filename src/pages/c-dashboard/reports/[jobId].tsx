import Layout from '@/components/dashboard/layout'
import ReportComponent from '@/components/report/ReportComponent'
import { Report } from '@/lib/report'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function JobReportsPage() {

    const router = useRouter()
    const id = router.query.jobId as string
    const [reports,setReports] = useState<Report[]>()
    
    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios({
                          method:'GET',
                          url:`${process.env.SMNK_URL}api/report/${id}`
                      })
                    const data = await res.data
                   setReports(data)
                    
                }catch(err:any){
                  console.log(err)
                  return err
                }
            }
        )()
    },[id])

    if(!reports) return <p>loading......</p>
  return (
    <Layout>
       {
            Array.isArray(reports) && reports.map((report,i)=>(
                <ReportComponent key={i} report={report}/>
            ))
       }
    </Layout>
    
  )
}

export default JobReportsPage