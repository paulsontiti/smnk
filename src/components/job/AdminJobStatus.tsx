

import {Button, CardActions } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'

export type JobStatus = {   
  hasUserApplied: boolean,
  isJobApproved: boolean,
  isProposalAccepted: boolean,
  isJobPaidFor: boolean
  isJobRated?:boolean
  approvedUserId?:string
  hasThisUserApplied?:boolean
  swPaid?:boolean
}

export const getJobStatus =  async(jobId:string,
                            setStatus:React.Dispatch<React.SetStateAction<JobStatus>>,
                            setError:React.Dispatch<React.SetStateAction<any>>,userId?:string)=>{
  try{
      if(jobId ){
          const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/job/get-job-status`,
              data:{jobId,userId}
          })
          const data = await res.data
      //console.log(data)
      setStatus(data)
    }else{
      console.log('Invalid request')
    }
      
      
  }catch(err:any){
    console.log(err)
    setError(err)
  }
 }
function AdminJobStatus({jobStatus}:{jobStatus:JobStatus}) {
    const router = useRouter()

  return (
    <>
      {
        jobStatus.swPaid && <h4 style={{color:'green'}}>Payment Confirmed</h4>
      }
        {jobStatus.isJobApproved && !jobStatus.swPaid &&
                                    <CardActions><span>Job Approved</span> 
                                    <Button variant='contained'
                                            size='small'
                                            onClick={()=>{
                                              router.push(`/a-dashboard/pay-sw/${jobStatus.approvedUserId}`)
                                            }}
                                    >Pay Worker</Button></CardActions>
        }
        {!jobStatus.isJobApproved && jobStatus.hasUserApplied &&  !jobStatus.isProposalAccepted && jobStatus.isJobPaidFor &&
                                      <CardActions>
                                          <span>Applied For</span>
                                          <Button variant='contained' size='small'>View Proposals</Button>
                                          
                                      </CardActions>
        }
        {!jobStatus.isJobApproved && jobStatus.isProposalAccepted &&
                                      <CardActions>
                                          <span>Proposal Accepted</span>
                                          <Button variant='contained' size='small'>View Proposal</Button>
                                          <Button variant='contained' size='small'>Instruct S.W</Button>
                                      </CardActions>
        }
        {jobStatus.isJobPaidFor  && !jobStatus.isProposalAccepted &&
                                      <CardActions>
                                          <span>Job Paid For</span>
                                          <Button variant='contained' size='small'>Message  Client</Button>
                                      </CardActions>
        }
        {!jobStatus.isJobPaidFor  &&
                                      <CardActions>
                                          <span>Job Not Paid For</span>
                                          <Button variant='contained'
                                                  size='small'
                                                  onClick={()=>{
                                                    router.push('/a-dashboard/payments') 
                                                  }}
                                          >Check Payment</Button>
                                      </CardActions>
        }
        {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </>
  )
}

export default AdminJobStatus