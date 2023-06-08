import { List} from "@mui/material";
import LoginButton from "./loginButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Box from '@mui/material/Box'
import NavDrawerLinks from "./NavDrawerLinks";
import LogoutSwitch from "@/components/switch/LogoutSwitch";
import { useState } from "react";
import { ColorPaletteProp, Sheet } from "@mui/joy";

export default function NavbarMenuItem(){
  const [color, setColor] = useState<ColorPaletteProp>("primary");
  const {_id} = useSelector((state:RootState)=>state.users.user)
    return(
      <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "warning" && {
          bgcolor: `${color}.900`,position:'static'
        }),
        flexGrow: 1,
        borderRadius: { xs: 0, sm: "xs" },
        m:'0 0 1rem 0'
      }}
    >
        <List
        sx={{ width: '100%', maxWidth: 360,height:'70vh',overflowY:"auto"}}
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
      </Sheet>
    )
}
