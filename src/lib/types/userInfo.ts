
export type IndividualPersonalInfo ={
    firstName:string,
lastName:string,
userName:string,
state:string,
    lga:string,
    address:string,
description:string,
userId:string
}

export type LGA = {
    id:number
    name:string
  }
 export type State = {
    id:number
    name:string,
    lgas:LGA[]
  }

  export type CompanyInfo ={
    _id?:string
    name:string,
    email:string,
    phone:string,
    state:string,
    lga:string,
    officeAddress:string,
    description:string,
userId:string
  }


 export type User ={
    _id:string
    email:string
phone:string
password:string
type: string
typeClass: string
}