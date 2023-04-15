import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginButton(){
    const router = useRouter()

    return(

        <Button sx={{textTransform:'capitalize',margin:'1rem .5rem'}}
                variant="outlined"
                size="small"
                onClick={()=>{
                                router.push('/account/login') 
                        }} 
        >Login</Button>
    )
}