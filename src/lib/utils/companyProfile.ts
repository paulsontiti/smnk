
import {object,string} from 'yup'
import { CompanyInfo } from '../types/userInfo'

export const companyInfoSchema = object({
    name: string().required('Company Name is required'),
    email: string().email('Company Email must be a valid email').required('Company Email is required'),
    
    officeAddress: string().required('Office Address is required'),
    state: string().required('State is required'),
    lga: string().required('L.G.A is required'),
    description: string().min(200,'Description should be at least 200 characters').required('Description is required'),
  })

  export const companyInfoValues :CompanyInfo={
    name:'',
    email:'',
    state:'',
    lga:'',
    officeAddress:'',
    description:'',
    userId : ''
  }