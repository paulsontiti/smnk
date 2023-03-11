import { Box } from "@mui/material";
import Account from "./account";
import HomeMenuDrawer from "./menuDrawer";
import Search from "./search";
import SMNK from "../smnk";

export default function MobileHeader(){

    return(
        <Box sx={{ 
            display:'flex',
            alignItems:'center',
            justifyContent:'space-around',
            //margin:'0.3rem 0.5rem'
        }}>
           
                <HomeMenuDrawer/>
           
            <SMNK />
            <Search />
            
               
            <Account />
        </Box>
    )
}