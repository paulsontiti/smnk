import { Box, MenuItem, MenuList } from "@mui/material";

export default function SearchDropdownMenuBox(){

    return(
        <>
            <MenuList sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'flex-start',
                width:100
            }}>
                <Box>
                <MenuItem>Find Talent</MenuItem>
                    </Box>
                    <Box>
                <MenuItem>Why SMNK?</MenuItem>
                    </Box>
            </MenuList>
        </>
    )
}