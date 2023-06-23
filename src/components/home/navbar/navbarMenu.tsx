import { List} from "@mui/material";
import Box from '@mui/material/Box'
import NavDrawerLinks from "./NavDrawerLinks";

export default function NavbarMenuItem(){

    return(
    
        <List
        sx={{ width: '100%', maxWidth: 360,height:'100vh',overflowY:"auto"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={''
        }
      >
        < Box component='nav'>
       
            <NavDrawerLinks/>
        </Box>
       
      </List>
    )
}
