import { acceptProposal, isJobPaidFor, isProposalAcceptedForJob } from '@/lib/proposal'
import React from 'react'
import {Box, Button} from '@mui/material'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'

function AcceptRejectProposalButtons({jobId}:{jobId:string}) {
    
    const router = useRouter()
    const [proposalAccepted,setProposalAccepted] = useState(false)
    const [paidForJob,setPaidForJob] = useState(false)

    useEffect(()=>{

        (
            async function(){
                const accepted = await isProposalAcceptedForJob(jobId)
                setProposalAccepted(accepted)
                const paid = await isJobPaidFor(jobId)
                setPaidForJob(paid)
            }
        )()
        
    })
    
    if(!proposalAccepted) return(
        <>
            <Button  size='small' variant='contained' onClick={()=>{
                                router.push(`/c-dashboard/job/edit-job/${jobId}`)
                            }}
            >Edit Job</Button>
            <Button size='small' variant='contained' onClick={()=>{
                                    router.push(`/c-dashboard/job/proposals/${jobId}`)
                                }}
            >View Proposals</Button>
        </>
    )
    
return      <>
                {
                    paidForJob ? 
                                    <>
                                        <h4 style={{color:'green',marginRight:'1rem'}}>Work in progress</h4>
                                        <Button size='small' variant='contained' onClick={()=>{
                                                            router.push(`/c-dashboard/reports/${jobId}`)
                                                        }}>View Reports</Button>
                                    </>
                                :   <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                                        <h4 style={{color:'green',marginRight:'1rem'}}>Proposal Accepted</h4>
                                        <Button size='small' style={{textTransform:'capitalize'}} variant='contained' onClick={()=>{
                                                            router.push(`/c-dashboard/payment/${jobId}`)
                                                        }}>Pay</Button>
                                    </Box>
                }
            </>

    
    
}

export default AcceptRejectProposalButtons