import React,{useState} from 'react';
<<<<<<< HEAD
import { Box, Typography } from '@mui/material';
=======
import { Drawer, Typography, Button,Box } from '@mui/material';
import Menu from './menu';
>>>>>>> 83ad3a1a9ec41e15f2a309a8ea22d20bcaa95fad
import SearchDropdownBox from './dropdownBox';


export default function SearchDropdownMenu() {
 const [showDropdown,setShowDropDown] = useState('none')

 //handle opening of drawer
 const handleClick=()=>{
    if(showDropdown === 'none'){
        setShowDropDown('block')
    }else{
        setShowDropDown('none')
    }
    
 }

  return (
    <Box>
      <Box
        
        onClick={handleClick}
      >
        <Typography>Job</Typography>
      </Box>
    <SearchDropdownBox showDropdown={showDropdown}/>
    </Box>
  );
}
