import Layout from '@/admin/components/adminLayout'
import SendMessage from '@/components/message/SendMessage'
import React from 'react'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { RedirectUser } from '@/lib/utils/urls'


function SendMessagePage() {

  const {user} = useSelector((state:RootState)=>state.users)

  const router = useRouter()
  const id = router.query.receiverId as string

  return (
    <Layout>
        <SendMessage receiverId={id} senderId={user._id} url={RedirectUser(user)}/>
    </Layout>
  )
}

export default SendMessagePage