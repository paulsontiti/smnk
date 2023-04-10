
import useSWR from 'swr'
import EditServiceForm from './editServiceForm';
import { getUserServices } from "@/lib/utils/user";



export default function EditService({id}:{id:string}){
   
    
        const {data,error} = useSWR('getServ',getUserServices(id))
            if(error) {
                console.log(error)
                return(
                    <p>Error occurred</p>
                )
            }
            
           
            if(!data) return <p>loading...........</p>

            return(
            <EditServiceForm id={id}/>
            )
    
    
}