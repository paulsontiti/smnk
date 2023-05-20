import React,{useEffect,useState} from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import axios from 'axios';

function RecommendedJobsLink() {

    const {user} = useSelector((state:RootState)=>state.users)

    const router = useRouter()

    const [isOnAJob,setIsOnAJob] = useState(false)

    useEffect(()=>{
       (
        async ()=>{
            
            try{
                if(user._id){
                    const res = await axios({
                        method:'POST',
                        url:`${process.env.SMNK_URL}api/users/proposal/jobs/is-sw-on-a-job`,
                        data:{userId:user._id}
                    })
                    const data = await res.data
                    setIsOnAJob(data)
              }else{
                console.log('Invalid request')
              }
                
                
            }catch(err:any){
              console.log(err)
              return err
            }
           }
       )()
    },[user._id])

  return (
    <ListItemButton disabled={isOnAJob} sx={{ ml: 4 }} onClick={()=>{
        router.push('/dashboard/job/recommended-jobs')
      }}
>
<ListItemText primary="Recommended Jobs" />      
</ListItemButton>
  )
}

export default RecommendedJobsLink