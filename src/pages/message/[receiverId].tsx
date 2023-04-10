import Layout from '@/admin/components/adminLayout'
import SendMessage from '@/components/message/SendMessage'
import React from 'react'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'


function SendMessagePage() {

  const {_id} = useSelector((state:RootState)=>state.users.user)

  const router = useRouter()
  const id = router.query.receiverId as string

  return (
    <Layout>
        <SendMessage receiverId={id} senderId={_id} url='/a-dashboard'/>
    </Layout>
  )
}

export default SendMessagePage