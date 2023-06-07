import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
    
export default function Logout(){
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

  
    return(           
           
        <>
        <Button   sx={{textTransform:'capitalize'}}
                variant='contained'
                size='small'
                endIcon={<LogoutIcon/>}
                 onClick={()=>{
                if((confirm('Are you sure you want to log out?'))){
                    dispatch(logout())
                    router.push('/')
                }
            }}>Logout</Button>
   
        </>
    )
}
