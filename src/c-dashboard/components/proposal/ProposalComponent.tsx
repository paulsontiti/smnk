import {acceptProposal, getProposalsByJobId } from '@/lib/proposal'
import { Button, Card, CardActions, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import useSWR from 'swr'



function ProposalComponent({id}:{id:string}) {
    const router = useRouter()

    const {data,error} = useSWR('getProposalsByJobId',getProposalsByJobId(id))
    
    if(error)return <p>Error occurred</p>
    if(!data) return <p>loading......</p>
    if(Array.isArray(data) && data.length < 1) return <p>No Proposal Yet</p>
  return (
    <>
        <h3>Job Id: {id}</h3>
        <h4>All Proposals</h4>
        {
            Array.isArray(data) && data.map((d,i)=>(
                <Card key={i}>
                    <CardContent>
                        <h5>User ID:</h5>
                        <p>{d.userId}</p>
                        <h5>Proposal:</h5>
                        <p>{d.content}</p>
                    </CardContent>
                    <CardActions>
                        <Button 
                            size='small' 
                            variant='contained'
                            onClick={async()=>{
                                const accepted = await acceptProposal(d._id,d.userId,id)
                                if(accepted){
                                    alert('Proposal accepted')
                                    router.push('/c-dashboard/job')
                                }
                            }}
                        >Accept</Button>
                        <Button 
                            size='small' 
                            variant='contained'
                        >Reject</Button>
                    </CardActions>
                </Card>
            ))
        }
    </>
  )
}

export default ProposalComponent