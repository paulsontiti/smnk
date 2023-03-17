import { List, ListItemButton, ListSubheader } from "@mui/material";
import Link from "next/link";
import LoginButton from "./loginButton";

export default function NavbarMenuItem(){

    return(
        <List
        sx={{ width: '100%', maxWidth: 360,height:'70vh', bgcolor: 'background.paper' ,overflowY:"auto"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <LoginButton/>
        }
      >
        <nav style={{
                        padding:'10px'
                    }}
        >
            <Link href='/about-us' style={{textDecoration:'none',color:'black'}}>About SMNK</Link>
        </nav>
       
      </List>
    )
}
