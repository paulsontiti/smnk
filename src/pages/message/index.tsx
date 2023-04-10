import AdminLayout from '@/admin/components/adminLayout'
import Layout from '@/components/dashboard/layout'
import Messages from '@/components/message'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

function MessgaePage() {

    const {user} = useSelector((state:RootState)=>state.users)
  return (
    <>
    
     {user.type === 'admin' ?
        <AdminLayout>
            <Messages/>
        </AdminLayout> : 

        <Layout>
            <Messages/>
        </Layout>}
    </>
    
   
  )
}

export default MessgaePage