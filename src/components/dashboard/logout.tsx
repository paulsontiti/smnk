
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LogoutIcon from '@mui/icons-material/Logout';
    
export default function Logout(){
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const logoutHandler =()=>{
        if((confirm('Are you sure you want to log out?'))){
            dispatch(logout())
            router.push('/')
        }
    }

    return(           
           
        <Button  size='small' onClick={logoutHandler}
            sx={{margin:'1rem 1rem'}}
            endIcon={<LogoutIcon/>}
            variant='contained'
        ></Button>
    )
}