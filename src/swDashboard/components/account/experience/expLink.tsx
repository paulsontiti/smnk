
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from "next/router";

export default function ExpLink(){
    
    const {user} = useSelector((state:RootState)=>state.users)


    const router = useRouter()
    
    
if(user.experience.length < 1) return(
   
     <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
        router.push('/sw-dashboard/experience/add-experience')
      }}>
<ListItemText primary={'Add Experience'} />      
</ListItemButton>
)

    return(
        <ListItemButton  sx={{ ml: 8 }}  onClick={()=>{
            router.push('/sw-dashboard/experience')
          }}>
    <ListItemText primary={'Experience'} />      
    </ListItemButton>
    )
}