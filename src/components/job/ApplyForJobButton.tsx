
import React,{useEffect,useState} from 'react'
import {CardActions } from '@mui/material'
import { useRouter } from 'next/router'
import { Job } from '@/lib/types/job'
import SWJobActionsButton from './SWJobActionsButton'
import { JobStatus} from './AdminJobStatus'


function ApplyForJobButton({job,jobStatus}:{job:Job,jobStatus:JobStatus}) {
    


  return (
    <CardActions>
        <SWJobActionsButton jobStatus={jobStatus} jobId={job._id}/>        
    </CardActions>
  )
}

export default ApplyForJobButton