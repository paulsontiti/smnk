import React from 'react'
import {Card,CardContent} from '@mui/material'
import { Message } from '@/lib/message'



function MessageComponent({message}:{message:Message}) {
  return (
    <Card>
        <CardContent>
        <h4>{message.subject}</h4>
        <h5>Sender Id: </h5>
        <p>{message.senderId}</p>
        <h5>Message:</h5>
        <p>{message.message}</p>

        </CardContent>
    </Card>
  )
}

export default MessageComponent