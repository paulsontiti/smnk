import axios from "axios"
import { CompanyInfo, User } from "../types/userInfo"
import {FormControls, states } from "../form"

  //sign up submit handler
  export const companyProfileSubmitHandler = async (values:CompanyInfo,user:User,router:any,url:string)=>{
    values.userId = user._id
        if(values.userId){
          try{
                  const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}${url}`,
                        data:values
                    })
                  const data = await res.data
                    alert(data.message)
                    if(data.successful && user && user.typeClass === 'company'){
                          router.push('/dashboard/company')
                        }else if(data.successful && user && user.typeClass === 'individual'){
                            router.push('/dashboard/individual')
                          }
              }catch(err:any){
                alert(err.response.data.message)
                return 
              }        
        }else{
            alert('Bad request!!!! No user id')
        }                                        

    }

  export const profileFormControls:FormControls[] = [
    {name:'name',label:'Company Name',control:'input'},
    {name:'email',label:'Company Email',control:'input',type:'email'},
    {name:'phone',label:'Company Phone Number',control:'input',type:'phone'},
    {name:'state',label:'State',control:'select',options:states},
    {name:'lga',label:'LGA',control:'select',options:states,fieldToCheckAgainst:'state'},
    {name:'officeAddress',label:'Office Address',control:'input'},
    {name:'description',label:'Company Description',control:'textarea'},
  ]

 
  