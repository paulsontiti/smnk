import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import {Button,CardActions,IconButton} from '@mui/material'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import { JobStatus, getJobStatus } from '@/components/job/AdminJobStatus'
import { deleteJob } from '@/lib/job'
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';


function AcceptRejectProposalButtons({jobId}:{jobId:string}) {
    
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
            getJobStatus(jobId,setJobStatus,setError)
        
    },[jobId])
    
    if(error) return <p>Error occurred</p>
    if(!jobStatus) return <p>loading............</p>

    return(
        <CardActions sx={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
            {
                !jobStatus.isProposalAccepted && !jobStatus.isJobPaidFor &&
                    <>
                        <IconButton color='primary'
                                    size='large'
                                    onClick={()=>{
                                            router.push(`/c-dashboard/job/edit-job/${jobId}`)
                                        }}
                                
                        ><EditIcon/>
                        </IconButton>
                        <IconButton size='large'
                                    color='error'
                                    onClick={async ()=>{
                                            if(confirm('Are you sure you want to deete this job')){
                                                const deleted = await deleteJob(jobId)
                                                if(deleted){
                                                    alert('Job Deleted')
                                                }else{
                                                    alert('An Error occured, please try again')
                                                }
                                            }
                                        }}
                                        
                        ><DeleteIcon /></IconButton>
                        
                    </>
            }
            {
                !jobStatus.isJobPaidFor &&  <Button size='small'
                                                    
                                                    sx={{textTransform:'capitalize'}}
                                                    variant='contained' 
                                                    onClick={()=>{
                                                                    router.push(`/c-dashboard/payment/${jobId}`)
                                                                }}
                                                    endIcon={<PaymentIcon/>}
                                            >Pay</Button>
            }
            {jobStatus.isJobPaidFor && !jobStatus.isProposalAccepted &&
                                        <Button size='small' variant='contained' onClick={()=>{
                                                            router.push(`/c-dashboard/job/proposals/${jobId}`)
                                                        }}
                                        >View Proposals</Button>
            }
            {
                jobStatus.isJobPaidFor && jobStatus.isProposalAccepted && !jobStatus.isJobApproved && <>
                                                                            <h4 style={{color:'green',marginRight:'1rem'}}>Work in progress</h4>
                                                                            <Button size='small' 
                                                                                    variant='contained' 
                                                                                    onClick={()=>{
                                                                                                router.push(`/c-dashboard/reports/${jobId}`)
                                                                                    }}
                                                                            >View Reports</Button>
            </>
            }
            {
                jobStatus.isJobApproved && !jobStatus.isJobRated && <>
                                                <span style={{color:'green',marginRight:'1rem'}}>
                                                                Job Completed</span>
                                                <Button size='small' 
                                                        variant='contained' 
                                                        onClick={()=>{
                                                                    router.push(`/c-dashboard/reports/rate/${jobId}`)
                                                        }}
                                                >Rate Skilled Worker</Button>
                                            </>
            }
            {jobStatus.isJobRated && 
                                        <>
                                            <Button size='small' 
                                                    variant='contained' 
                                                    onClick={()=>{
                                                                router.push(`/c-dashboard/tip-sw/${jobStatus.approvedUserId}`)
                                                    }}
                                            >Tip Skilled Worker</Button>
                                        </>
            }
        </CardActions>
    )    
}

export default AcceptRejectProposalButtons