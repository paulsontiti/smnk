
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { JobStatus } from './AdminJobStatus'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { confirmPayment } from '@/lib/payment'

function SWJobActionsButton({jobId,jobStatus}:{jobStatus:JobStatus,jobId:string}) {
    const router = useRouter()
    const {_id} = useSelector((state:RootState)=>state.users.user)
  return (
   <>
        {
            jobStatus.swPaid && <h4 style={{color:'green'}}>Payment Confirmed. Well Done!!!!</h4>
        }
        { jobStatus.isJobPaidFor && !jobStatus.isProposalAccepted && !jobStatus.hasThisUserApplied &&   <Button 
                                            variant='contained'
                                            onClick={()=>{
                                                router.push(`/sw-dashboard/job/${jobId}`)
                                            }}
                                        >Apply
                                        </Button> 
        }
        {
          jobStatus.isJobPaidFor &&  !jobStatus.isProposalAccepted && jobStatus.hasThisUserApplied &&    <Button 
                                                                                variant='contained'
                                                                                size='small'
                                                                            >Applied
                                                                            </Button>
        }
    {
        jobStatus.isJobApproved && !jobStatus.swPaid && <><Button 
                                                            variant='contained'
                                                            size='small' onClick={async()=>{
                                                                const confirmed = await confirmPayment(jobId)
                                                                if(confirmed){
                                                                    alert('Payment confirmed')
                                                                    router.push('/dashboard/job/done')
                                                                }
                                                            }}
                                                        >Confirm Payment
                                                        </Button>
                                                        <Button 
                                                            variant='contained'
                                                            size='small' onClick={()=>{
                                                                router.push(`/report/${jobId}`)
                                                            }}
                                                        >Message Admin
                                                        </Button></>
    }
            {
                jobStatus.isProposalAccepted && jobStatus.hasThisUserApplied
                 && jobStatus.isJobPaidFor && jobStatus.approvedUserId === _id && !jobStatus.isJobApproved &&
                    <>
                        <Button 
                            variant='contained'
                            size='small' onClick={()=>{
                                router.push(`/report/${jobId}`)
                            }}
                        >Give Report
                        </Button>
                        <Button 
                            variant='contained'
                            size='small' onClick={()=>{
                                router.push(`/report/corrections/${jobId}`)
                            }}
                        >View Corrections
                        </Button>
                    </>
            }
        
        {!jobStatus.isJobPaidFor &&  <h4 style={{color:'red'}}>Job Not Paid for</h4>   
        }

        
        {/* <pre>{JSON.stringify(jobStatus,null,4)}</pre> */}
    </>
  )
}

export default SWJobActionsButton