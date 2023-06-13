import * as React from 'react';
import {IconButton,Drawer} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeContainer from '@/components/theme/ThemeContainer';

export default function MenuDrawer({children}:{children:JSX.Element}) {
  const [openDrawer, setOpenDrawer] = React.useState(false)
 
  return (
    <div>
     
            <IconButton onClick={()=>{setOpenDrawer(!openDrawer)}} sx={{color:'white'}}>
                <MenuIcon/>
            </IconButton>
          <Drawer
            anchor='left'
            open={openDrawer}
            onClose={()=>{setOpenDrawer(false)}}
            sx={{
                maxWidth:"50vw",
                padding:'.5rem',
            }}
          >
             <ThemeContainer>
             <IconButton onClick={()=>{setOpenDrawer(!openDrawer)}} sx={{color:'white'}}>
                <CloseIcon/>
            </IconButton>
         {children}
             </ThemeContainer>
          </Drawer>
    </div>
  );
}

