import {array, object,string} from 'yup'

export type Service ={
    title:string,
    skills:string[]
    description:string,
    category:string,
    userId:string
  }

  export const addEditService = async (values:Service,axios:any,url:string)=>{
 
    try{
            const res = await axios({
                    method:'POST',
                    url:`${process.env.SMNK_URL}api/sw-dashboard/service/${url}`,
                    data:values
                })
            const data = await res.data
           
            return data
    
    }catch(err:any){
        console.log(err)
        return err
    }
  
}

export const serviceDetailsSchema = object({
    title: string().required('Title is required'),
    description: string().min(200,'Service Description should be at least 200 characters').required('Service Description is required'),
    category: string().required('Category is required'),
})