import axios from 'axios'
import {array, object,string} from 'yup'
import { NextRouter } from 'next/dist/client/router'
import { FormControls } from '../form'

export type Service ={
    _id?:string
    title:string,
    skills:string[]
    description:string,
    category:string,
    userId:string
  }

  export const serviceSubmitHandler = async (values:Service,router:NextRouter,url:string)=>{
 
    try{
            const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}${url}`,
                    data:values
                })
            const data = await res.data
           
            alert(data.message)
                      if(data.successful){
                        router.push('/sw-dashboard/service')
                      }
    
    }catch(err:any){
        console.log(err)
        alert(err.response.data.message)
    }
  
}

export const serviceDetailsSchema = object({
    title: string().required('Title is required'),
    description: string().max(200,'Service Description should not be more than 200 characters').required('Service Description is required'),
    category: string().required('Category is required'),
    skills: array().min(1,'At Least One Skill is required')
})

export const serviceFormControls:FormControls[] = [
    {name:'title',label:'Service Title',control:'input'},
    {name:'skills[0]',label:'Skill One',control:'input'},
    {name:'skills[1]',label:'Skill Two',control:'input'},
    {name:'category',label:'Category',control:'input'},
    {name:'description',label:'Service Description',control:'textarea'},
  ]