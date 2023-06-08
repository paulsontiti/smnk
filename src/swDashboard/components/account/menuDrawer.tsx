import * as React from 'react';
import {IconButton,Drawer} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

export default function MenuDrawer({children,color}:{children:JSX.Element,color:string}) {
  const [openDrawer, setOpenDrawer] = React.useState(false)
 
  return (
    <div>
     
            <IconButton onClick={()=>{setOpenDrawer(!openDrawer)}} sx={{color:{color}}}>
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
         {children}
          </Drawer>
    </div>
  );
}

