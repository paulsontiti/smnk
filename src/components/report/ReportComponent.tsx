import React from 'react'
import {Button, Card,CardActions,CardContent} from '@mui/material'
import { Report } from '@/lib/report'
import axios from 'axios'
import { useRouter } from 'next/router'

const approveJob = async(router:any,jobId:string)=>{
        try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/c-dashboard/job/approve-job`,
                  data:{jobId}
              })
            const data = await res.data
            alert(data.message)
            if(data.successful){
              router.push('/c-dashboard')
            }
            
        }catch(err:any){
          console.log(err)
          return err
        }
}


function ReportComponent({report}:{report:Report}) {
  const router = useRouter()
  return (
    <Card>
        <CardContent>
        <h4>{report.subject}</h4>
        <h5>Sender Id: </h5>
        <p>{report.senderId}</p>
        <h5>Report:</h5>
        <p>{report.report}</p>
        </CardContent>
        <CardActions>
          <Button size='small' sx={{textTransform:'capitalize'}}
                  variant='contained' color='success'
                  onClick={()=>{
                    approveJob(router,report.jobId)
                  }}
          >Approve</Button>
          <Button  size='small' sx={{textTransform:'capitalize'}}
                   variant='contained' color='warning'
                   onClick={()=>{
                    router.push(`/report/corrections/${report.jobId}`)
                  }}
          >Correct</Button>
          <Button  size='small' sx={{textTransform:'capitalize'}}
                   variant='contained' color='error'
                   onClick={()=>{
                    router.push(`/report/complaint/${report.jobId}`)
                  }}
          >Complain</Button>
        </CardActions>
    </Card>
  )
}

export default ReportComponent