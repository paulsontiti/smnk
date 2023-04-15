import React from 'react'
import RatingForm from './RatingForm'
import { RedirectUser } from '@/lib/utils/urls'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

function RatingComponent({jobId}:{jobId:string}) {
    const {user} = useSelector((state:RootState)=>state.users)
  return (
    <RatingForm jobId={jobId} raterId={user._id} url={RedirectUser(user)}/>
  )
}

export default RatingComponent