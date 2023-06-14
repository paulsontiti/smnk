import * as React from "react";
import { IconButton, Drawer, Box } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuItem from "./navbarMenu";

import CloseIcon from '@mui/icons-material/Close';
import LoginButton from "./loginButton";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import LogoutSwitch from "@/components/switch/LogoutSwitch";

export default function NavbarDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const {_id} = useSelector((state:RootState)=>state.users.user)

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 2,color:'white'}}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        sx={{
          maxWidth: "50vw",
          padding: ".5rem",
        }}
      >
          <Box bgcolor='#04023B' color='white' display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
         
          {_id ? <LogoutSwitch/> : <LoginButton/>}
        
        
           <IconButton onClick={()=>{setOpenDrawer(!openDrawer)}} sx={{color:'white'}}>
                <CloseIcon/>
            </IconButton>
         </Box>
        <NavbarMenuItem />
      </Drawer>
    </div>
  );
}
