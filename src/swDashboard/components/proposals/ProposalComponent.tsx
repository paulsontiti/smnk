import { getProposalsByUserId } from '@/lib/proposal'
import { RootState } from '@/store'
import { Card, CardContent, Box, Typography,CardActions,Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { useRouter } from 'next/router'


function ProposalComponent() {

    const router = useRouter()
    const {_id} = useSelector((state:RootState)=>state.users.user)

    const {data,error} = useSWR('getProposalsByUserId',getProposalsByUserId(_id))
    
    
    if(error)return <p>Error occurred</p>
    if(!data) return <p>loading......</p>
    if(Array.isArray(data) && data.length === 0) 
    return <Typography sx={{margin:'1rem 1rem'}} variant='body2'>No proposals</Typography>
  return (
    <>
        {Array.isArray(data) && data.map((job)=>(
            <>
            <Typography variant='body2'>All Proposals</Typography>
                {
                    job &&  <Card>
                        
                    <CardContent>
                        <h5>Job Details</h5>
                        <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                        <h5>Title:</h5>
                        <h6>{job.details.title}</h6>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <h5>Proposal:</h5>
                        <p>{job.proposal.content}</p>
                        
                    </CardContent>
                    {/* <CardActions>
                       {d.pro.accepted ? <h4 style={{color:'green'}}>Proposal Accepted</h4>  : 
                       <Button variant='contained' onClick={()=>{
                            router.push(`/dashboard/job/proposal/${d.pro._id}`)
                       }}> Edit Proposal</Button>}
                    </CardActions> */}
                </Card>
                }
           </>
        ))}
    </>
  )
}

export default ProposalComponent