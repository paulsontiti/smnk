import React from 'react'
import JobForm from './jobForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { JobDetails } from '@/lib/job'
import ErrorAlert from '@/components/alerts/Error'

function CreateJob() {

    const {_id} = useSelector((state:RootState)=>state.users.user)


    const initialValues :JobDetails={
        title:'',
        type:'physical',
        category:'',
        state:'',
        lga:'',
        address:'',
        description:'',
        budget:0,
        startDate: new Date(),
        endDate: new Date(),
        agreeToTerms:false,
        userId:_id,
          
        }
        if(!_id) return <ErrorAlert message='You are not logged in or have an account. Please login in or create an account'/>
  return (
    <JobForm initialValues={{details:initialValues,jobId:''}}/>
  )
}

export default CreateJob