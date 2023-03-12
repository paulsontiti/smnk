import { IconButton, InputBase, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function DesktopSearchBox(){

    return(

        <InputBase 
        placeholder="search for jobs and talent"
<<<<<<< HEAD
       
=======
        
>>>>>>> 83ad3a1a9ec41e15f2a309a8ea22d20bcaa95fad
        endAdornment={<IconButton><MoreVertIcon/></IconButton>}
        sx={{
            border:'1px solid grey',
            borderRadius:'20px',
            backgroundColor:'white',
            width:'80%',
            padding:'0 1rem'
        }}
        />
        // <Box sx={{
        //     border:'1px solid black',
        //     borderRadius:'20px',
        //     backgroundColor:'white',
        //     color:'black',
        //     width:300,
        //     height:40,
        //     display:'flex',
        //     alignItems:'center',
        //     justifyContent:'space-between',
        //     padding:'5px 10px',
        //     marginRight:'20px'

        // }}>
        //     <Box sx={{
        //          display:'flex',
        //          alignItems:'center',
        //          justifyContent:'flex-start'
        //     }}>
        //     <Search/>
        //     <Typography>Search</Typography>
        //     </Box>
            
        //     <Box sx={{
        //          display:'flex',
        //          alignItems:'center',
        //          justifyContent:'flex-end'
        //     }}>
        //         <SearchDropdownMenu/>
        //     </Box>
        // </Box>
    )
}
