import { MenuItem, MenuList } from "@mui/material";

export default function Menu(){

    return(
        <>
            <MenuList sx={{
                display:'flex',
                alignItems:'center',
                color:"white"
            }}>
                <MenuItem>Home</MenuItem>
                <MenuItem>About SMNK</MenuItem>
                <MenuItem>Contact Us</MenuItem>
            </MenuList>
        </>
    )
}