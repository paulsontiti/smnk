import { List} from "@mui/material";
import LoginButton from "./loginButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Box from '@mui/material/Box'
import NavDrawerLinks from "./NavDrawerLinks";
import LogoutSwitch from "@/components/switch/LogoutSwitch";

export default function NavbarMenuItem(){

  const {_id} = useSelector((state:RootState)=>state.users.user)
    return(
        <List
        sx={{ width: '100%', maxWidth: 360,height:'70vh', bgcolor: 'background.paper' ,overflowY:"auto"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={''
        }
      >
        < Box component='nav'>
          {_id ? <LogoutSwitch/> : <LoginButton/>}
            <NavDrawerLinks/>
        </Box>
       
      </List>
    )
}
