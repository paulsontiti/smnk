import {Drawer,IconButton} from '@mui/material'
import {useState} from 'react'
import MenuIcon from '@material-ui/icons/Menu';

export default function HomeMenuDrawer(){

    const [isDraweOpen,setIsDrawerOpen]=  useState(false)
    return(
        <>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={isDraweOpen} onClose={()=>{setIsDrawerOpen(false)}}>
<h1>Drawer</h1>
</Drawer>
        </>
       
    )
}
