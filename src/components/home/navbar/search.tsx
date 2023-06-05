import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from '@mui/material'

export default function NavSearchBox(){

    return(
        <>
            <IconButton sx={{color:'white'}}>
                <SearchIcon/>
            </IconButton>
        </>
    )
}