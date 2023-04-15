
import { Job } from '@/lib/types/job'
import { Grid, Card, CardContent,Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import ApplyForJobButton from './ApplyForJobButton'
import AdminJobStatus, { JobStatus, getJobStatus } from './AdminJobStatus'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/router'
import AcceptRejectProposalButtons from '@/c-dashboard/components/jobs/AcceptRejectProposalButtons'


function JobDetailsComponent({job}:{job:Job}) {
    const {user} = useSelector((state:RootState)=>state.users)
    const router = useRouter()

    const [jobStatus,setJobStatus] = useState<JobStatus>({
                                                            hasUserApplied:false,
                                                            isJobApproved:false,
                                                            isProposalAccepted:false,
                                                            isJobPaidFor:false,
                                                            isJobRated:false
                                                        })
    const [error,setError] = useState()

    useEffect(()=>{
        getJobStatus(job._id,setJobStatus,setError,user._id)

    },[job._id,user._id])

if(error) return <p>Error occurred</p>
if(!jobStatus) return <p>loading............</p>
  return (
    <Card>
       <CardContent>
        <Typography variant='h6' sx={{textTransform:'capitalize',margin:'1rem 0'}}>{job.title}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <span>Job Type:  </span>
                </Grid>
                <Grid item xs={6}>
                    <span>{job.type}</span>
                </Grid>
                <Grid item xs={6}>
                    <span>Category:  </span>
                </Grid>
                <Grid item xs={6}>
                    <span>{job.category}</span>
                </Grid>
                <Grid item xs={6}>
                    <span>Description:  </span>
                </Grid>
                <Grid item xs={12}>
                    <span>{job.description}</span>
                </Grid>
                <Grid item xs={6}>
                    <span>Budget:  </span>
                </Grid>
                <Grid item xs={6}>
                    <span>{job.budget}</span>
                </Grid>
                {
                    job.type === 'physical' &&  <>
                                                    <Grid item xs={6}>
                                                        <span>State:  </span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <span>{job.state}</span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <span>LGA:  </span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <span>{job.lga}</span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <span>Address:  </span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <span>{job.address}</span>
                                                    </Grid>
                                                </>
                }
                <Grid item xs={6}>
                    <span>Start Date:  </span>
                </Grid>
                <Grid item xs={6}>
                    <span>{job.startDate?.toString().slice(0,10)}</span>
                </Grid>
                <Grid item xs={6}>
                    <span>End Date:  </span>
                </Grid>
                <Grid item xs={6}>
                    <span>{job.endDate?.toString().slice(0,10)}</span>
                </Grid>
            </Grid>
       
       </CardContent>
      {     user.type === 'admin' ? <AdminJobStatus jobStatus={jobStatus}/> : 
            user.type === 'skilled worker' ? <ApplyForJobButton jobStatus={jobStatus} job={job}/> :
                                            <AcceptRejectProposalButtons jobId={job._id}/>
      }
       
    </Card>
  )
}

export default JobDetailsComponent