import Layout from '@/components/dashboard/layout'
import SendMessage from '@/components/message/SendMessage'
import { RedirectUser } from '@/lib/utils/urls'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

function MessageCustomerService() {
    const {user} = useSelector((state:RootState)=>state.users)
     
  return (
    <Layout>
        <SendMessage receiverId={process.env.CUSTOMER_SERVICE_ID as string} senderId={user._id} url={RedirectUser(user)}/>
    </Layout>
    
  )
}

export default MessageCustomerService