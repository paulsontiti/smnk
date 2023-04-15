import React from 'react'
import {Card,CardContent,CardActions,Button} from '@mui/material'
import { Complaint } from '@/lib/complaint'
import { useRouter } from 'next/router'



function ComplaintComponent({complaint}:{complaint:Complaint}) {
    const router = useRouter()
  return (
    <Card>
        <CardContent>
        <h4>{complaint.subject}</h4>
        <h5>Sender Id: </h5>
        <p>{complaint.senderId}</p>
        <h5>Complaint:</h5>
        <p>{complaint.complaint}</p>

        </CardContent>
        <CardActions>
            <Button size='small' variant='contained'
                    onClick={()=>{router.push(`/message/${complaint.senderId}`)}} 
            >Message Complainant</Button>
        </CardActions>
    </Card>
  )
}

export default ComplaintComponent