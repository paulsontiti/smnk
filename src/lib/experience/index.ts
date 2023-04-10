import axios from "axios"
import { FormControls, states } from "../form"
import {date, object,string} from 'yup'


  export const expDetailsSchema = object({
    title: string().required('Title is required'),
    company: string().required('Company Name is required'),
    address: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().max(200,'Role Description should not be more than 200 characters').required('Role Description is required'),
    startDate: date().required('Start Date is required'),
    endDate: date().when('onRole',{is:false,then:date().required('End Date is required if you are no longer on this role')})
})

  export type Experience ={
    _id?:string
    title:string,
    company:string,
    state:string,
    lga:string,
    address:string,
    description:string,
    startDate:Date | null,
    endDate?:Date,
    userId:string,
    onRole:boolean
  }

  //sign up submit handler
  export const experienceSubmitHandler = async (values:Experience,router:any,url:string)=>{

        if(values.userId){
                try{
                      const res = await axios({
                            method:'POST',
                            url:`${process.env.SMNK_URL}${url}`,
                            data:values
                        })
                      const data = await res.data
                      
                      alert(data.message)
                      if(data.successful){
                        router.push('/sw-dashboard/experience')
                      }
                  
                }catch(err:any){
                  console.log(err)
                  alert(err.response.data.message)
                  return
                }
            
          }else{
            alert('Bad request!!!! No user id')
          }                                

    }

  export const expFormControls:FormControls[] = [
    {name:'title',label:'Role Title',control:'input'},
    {name:'company',label:'Company Name',control:'input'},
    {name:'state',label:'State',control:'select',options:states},
    {name:'lga',label:'LGA',control:'select',options:states,fieldToCheckAgainst:'state'},
    {name:'address',label:'Company Address',control:'input'},
    {name:'description',label:'Role Description',control:'textarea'},
    {name:'startDate',label:'Start Date',control:'date'},
    {name:'onRole',label:"I'm currently on this role",control:'checkbox'},
    {name:'endDate',label:'End Date',control:'date',fieldToCheckAgainst:'onRole'},
  ]

 
  