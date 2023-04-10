import React, { useEffect, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import { Badge, IconButton } from "@mui/material";
import { Message, unreadMessagesCount } from '@/lib/message';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';


function MessageBox() {

    const {_id} = useSelector((state:RootState)=>state.users.user)

    const [msgs,setMsgs] = useState(0)

    const router = useRouter()

    useEffect(()=>{
        (
            async function(){
                const data = await unreadMessagesCount(_id)
                setMsgs(data)
            }
        )()
    },[_id])
  return (
    <IconButton onClick={()=>{
                    router.push('/message')
                }}  
    >
        <Badge badgeContent={msgs} color="primary">
            <MailIcon color="action" />
        </Badge>
    </IconButton>
  )
}

export default MessageBox