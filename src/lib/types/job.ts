import axios from "axios"
import { boolean, date, number, object, string } from "yup"

export type Job ={
    title:string,
    type:string,
    category:string,
    state:string,
    lga:string,
    address:string,
    description:string,
    budget:number,
    startDate:Date | null,
    endDate:Date | null,
    agreeToTerms:boolean,
    userId:string,
    _id:string,
    label:string
}

export const getDate = (date:Date | null)=> {
    return date && date.toString().slice(0,10)
  }
   
export const jobSchema = object({
    title: string().required('Title is required'),
    description: string().required('Job Description is required'),
    type: string().required('Type of Job is required'),
    state: string().when('type',{is:'physical',then:string().required('State is required')}),
    lga: string().when('type',{is:'physical',then:string().required('LGA is required')}),
    address: string().when('type',{is:'physical',then:string().required('Address is required')}),
    budget: number().required('Budget is required'),
    startDate: date().required('Start Date is required'),
    endDate: date().required('End date is required'),
    agreeToTerms: boolean().isTrue("Please agree to Terms & Conditions").required('Agreeing to Terms and Conditions is required'),
})

export const createJobSubmitHandler = async (_id:string,values:Job,router:any)=>{
  //return console.log(values)
    if(_id){
        const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/c-dashboard/job/create-job`,
            data:values
        })
        const data = await res.data
        
        if(data.isJobAdded){
          alert(data.message)
          router.push('/c-dashboard/job')
        }else{
          alert(data.message)
          return
        }
        
      }else{
        alert('Bad request!!!! No user id')
      } 
}

export const editJobSubmitHandler = async (_id:string,values:Job,router:any)=>{
  //return console.log(values)
    if(_id){
        const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/c-dashboard/job/edit-job`,
            data:values
        })
        const data = await res.data
        
        if(data.isJobEdited){
          alert(data.message)
          router.push('/c-dashboard/job')
        }else{
          alert(data.message)
          return
        }
        
      }else{
        alert('Bad request!!!! No user id')
      } 
}
export const getJobsByClientId = (userId:string)=>{
  const res = async ()=>{
      try{
          const res = await axios({
                method:'POST',
                url:`${process.env.SMNK_URL}api/c-dashboard/job/${userId}`
            })
          const data = await res.data
         return data
          
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}

export const getJobByJobId = (id:string)=>{
  const res = async ()=>{
      try{
        if(id){
          const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/c-dashboard/job/job-by-id`,
            data:{id}
        })
          const data = await res.data
        return data
        }else{
          console.log('Invalid request')
        }
          
          
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}
export const getAllJobs = ()=>{
  const res = async ()=>{
      try{
          const res = await axios({
                method:'GET',
                url:`${process.env.SMNK_URL}api/a-dashboard/jobs`
            })
          const data = await res.data
         return data
          
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}

export const getRecommendedSkilledWorkersInfo = (id:string)=>{
  const res = async ()=>{
      try{
        if(id){
          const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/a-dashboard/jobs/recommended-skilled-workers-for-job`,
            data:{id}
        })
          const data = await res.data
        return data
        }else{
          console.log('Invalid request')
        }
          
          
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}
export const getRecommendedJobs = (id:string)=>{
  console.log(id)
  const res = async ()=>{
      try{
        if(id){
          const res = await axios({
            method:'POST',
            url:`${process.env.SMNK_URL}api/sw-dashboard/jobs/recommended-jobs`,
            data:{id}
        })
          const data = await res.data
        return data
        }else{
          console.log('Invalid request')
        }
          
          
      }catch(err:any){
        console.log(err)
        return err
      }
     }
  return res
}