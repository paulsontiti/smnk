import {number, object,string} from 'yup'

export type BankDetails ={
    accounName:string,
   
    accountNumber:string,
    bankName:string,
    userId:string
  }

  export const addEditBankDetails = async (values:BankDetails,axios:any,url:string)=>{
 
    try{
            const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/sw-dashboard/bank-details/${url}`,
                    data:values
                })
            const data = await res.data
           
            return data
    
    }catch(err:any){
        console.log(err)
        return err
    }
  
}

export const bankDetailsSchema = object({
    accountName: string().required('Account Name is required'),
   
    accountNumber: string().min(10,'Account Number can not be less than 10 numbers')
                            .max(10,'Account Number can not be more than 10 numbers')
                            .required('Account Number is required'),
    bankName: string().required('Bank Name is required'),
})