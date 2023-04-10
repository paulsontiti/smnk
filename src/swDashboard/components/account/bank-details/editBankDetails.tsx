
import useSWR from 'swr'
import EditBankDetailsForm from './editBankDetailsForm';
import { getUserBankDetails } from '@/lib/utils/user';




export default function EditBankDetails({id}:{id:string}){
    
    
        const {data,error} = useSWR('getBankdetails',getUserBankDetails(id))
            if(error) {
                console.log(error)
                return(
                    <p>Error occurred</p>
                )
            }
            
            if(!data) return <p>loading...........</p>

            return(
            <EditBankDetailsForm initialValues={data}/>
            )
    
    
}