import React from 'react'
import JobForm from './jobForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Job, createJobSubmitHandler } from '@/lib/types/job'
import { JobDetails } from '@/lib/job'

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
  return (
    <JobForm initialValues={initialValues} _id={_id} jobId=''
     submitHandler={createJobSubmitHandler}/>
  )
}

export default CreateJob