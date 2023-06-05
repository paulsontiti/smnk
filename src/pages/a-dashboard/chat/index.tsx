
import AdminLayout from '@/admin/components/adminLayout'
import ChatBox from '@/components/chat/ChatBox'
import React from 'react'

function ChatPlatform() {
 
  
  return (
 <AdminLayout>
  <ChatBox isAdmin={true}/>
 </AdminLayout>
  )
}

export default ChatPlatform