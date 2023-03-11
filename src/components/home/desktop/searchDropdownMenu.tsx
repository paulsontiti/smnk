import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import { Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Menu from './menu';
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
