
import {date, object,string} from 'yup'


export const states=[
    {id:1, name:'Abia',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:2, name:'Adamawa',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]},
    {id:3, name:'Akwaibom',lgas:[{id:1,name:'Abia North'},{id:2,name:'Abia South'},{id:3,name:'Abia East'}]}
  ]

 export const months =[
    {
      id:1,
    name:'January'
    },
    {
      id:2,
    name:'Febuary'
    },
    {
      id:3,
    name:'March'
    },
    {
      id:4,
    name:'April'
    },
    {
      id:5,
    name:'May'
    },
    {
      id:6,
    name:'June'
    },
    {
      id:7,
    name:'July'
    },
    {
      id:8,
    name:'August'
    },
    {
      id:9,
    name:'September'
    },
    {
      id:10,
    name:'October'
    },
    {
      id:11,
    name:'November'
    },
    {
      id:12,
    name:'December'
    },
  ]
  export const years =[
    {
      id:1,
    value:2023
    },
    {
      id:2,
      value:2022
    },
    {
      id:3,
      value:2021
    },
    {
      id:4,
      value:2020
    },
    {
      id:5,
      value:2019
    },
    {
      id:6,
      value:2018
    },
    {
      id:7,
      value:2017
    },
    {
      id:8,
      value:2016
    },
    {
      id:9,
      value:2015
    },
    {
      id:10,
      value:2014
    },
    {
      id:11,
      value:2013
    },
    {
      id:12,
      value:2012
    },
  ]

  export const expDetailsSchema = object({
    title: string().required('Title is required'),
    company: string().required('Company Name is required'),
    city: string().required('City is required'),
    address: string().required('Street Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().min(200,'Role Description should be at least 200 characters').required('Role Description is required'),
    startMonth: string().required('Start Month is required'),
    startYear: string().required('Start Year is required'),
})

  export type ExpInitialValues ={
    title:string,
    company:string,
    city:string,
    state:string,
    lga:string,
    address:string,
    description:string,
    startMonth:string,
      startYear:string
      endMonth:string
      endYear:string
  }
