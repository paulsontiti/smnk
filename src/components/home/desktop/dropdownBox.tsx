import { Box } from "@mui/system";
import SearchDropdownMenuBox from "./dropdownMenu";

export default function SearchDropdownBox(props:{showDropdown:string}){

    return(
        <Box sx={{
            display:props.showDropdown,
            position:'absolute',
            top:'50px'
         }}>
            <SearchDropdownMenuBox/>
         </Box>
    )
}