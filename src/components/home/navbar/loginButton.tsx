import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LoginIcon from '@mui/icons-material/Login';

export default function LoginButton(){
    const router = useRouter()

    return(

        <Button sx={{textTransform:'capitalize',margin:'1rem .5rem', color:'white'}}
                variant="outlined"
                size="small"
                endIcon={<LoginIcon/>}
                onClick={()=>{
                                router.push('/account/login') 
                        }} 
        >Login</Button>
    )
}