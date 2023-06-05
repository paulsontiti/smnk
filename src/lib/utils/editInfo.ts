import axios from "axios"
import { IndividualPersonalInfo } from "../types/userInfo"

import {object,string} from 'yup'


 //sign up submit handler
 export const editInfoSubmitHandler = async (values:IndividualPersonalInfo,_id:string,router:any)=>{
    if(_id){
      try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/personal-info/edit-personal-info`,
              data:values
          })
        const data = await res.data
        alert(data.message)
        if(data.infoEdited){
          router.push('/dashboard/individual')
        }
        
    }catch(err:any){
      console.log(err)
      alert(err.response.data.message)
    }
    }else{
      alert('Bad request!!!! No user id')
    } 
    
  }

 export const individualInfoSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    userName: string().required('Username is required'),
    address: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().max(200,'Description should not be more than 200 characters').required('Description is required'),
  })
 