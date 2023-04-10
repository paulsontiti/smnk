
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { logout } from '@/store/slices/userSlice'
import { Button } from "@mui/material";
import { useRouter } from "next/router";

    
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
            <Button size="small" 
                    onClick={logoutHandler} 
                    sx={{
                            padding:'.3rem .5rem',
                            backgroundColor:'red',
                            color:'white',
                            borderRadius:'20px',
                            margin:'1rem .5rem',
                            marginLeft:'9rem',
                            textTransform:'capitalize',
                            width:'20%',
                        }} 
        >Logout</Button>
    )
}