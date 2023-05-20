import { getUserSub} from '@/lib/user'
import { RootState } from '@/store'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const Upgrade = ({visibility}:{visibility:string}) => {
    const router = useRouter()
    const {user} = useSelector((state:RootState)=>state.users)
    const [subscribed,setSubscribed] = useState(false)
    
    useEffect(()=>{
      if(user.subscription && user.subscription.expiringDate){
        setSubscribed(new Date(user.subscription.expiringDate) > new Date() && user.subscription.type === visibility)
      }else{
        (
          async()=>{
            const data = await getUserSub(user._id)
            setSubscribed(data && data.type === visibility)
          }
        )()
      }
    },[user,visibility])
  return (
    <Button onClick={
        ()=>{
            router.push(`/dashboard/payment/${visibility}`)
        }
    } size='small' fullWidth color='success' variant='contained'
     disabled={subscribed}>
        {subscribed ? 'subscribed' : 'Upgrade'}
      </Button>
  )
}
