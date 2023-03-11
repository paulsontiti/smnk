import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function DesktopAccount(){

    return (
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'170px'}}>
        <Box sx={{backgroundColor:'white',
            color:'black',borderRadius:'20px',width:'80px',
            height:'30px',alignItems:'center',display:'flex',justifyContent:'center'
            }}
        >
            <Link href="/account/login" style={{
                    textDecoration:'none'
                }}>Login</Link>
        </Box>
        <Box sx={{backgroundColor:'white',
            color:'black',borderRadius:'20px',width:'80px',
            height:'30px',alignItems:'center',display:'flex',justifyContent:'center'}}
        >
                <Link href="/account/signup" style={{
                    textDecoration:'none'
                }}>Sign Up</Link>
        </Box>
    </Box>
    
    )
    
}