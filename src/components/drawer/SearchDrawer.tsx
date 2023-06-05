import * as React from "react";
import {
  IconButton,
  Drawer,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Autocomplete,
  Container,Typography
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createSetFromArray, fetchJobs, fetchSearchJobs, fetchTalents, fetchUsers } from "@/lib/search";
import { styled,} from "@mui/system";
import { User } from "@/lib/types/userInfo";
import SWDetailsAccordion from "../accordion/SWDetailsAccordion";
import SearchedJobDetailsAccordion from "../accordion/SearchedJobDetailsAccordion";
import DeleteFloatingActionButtons from "../fab/Delete";
import CancelFloatingActionButtons from "../fab/Cancel";
export type SearchOption = { firstLetter: string; option: string };

const searchOptionsList = async (searchOption: string) => {
  switch (searchOption) {
    case "Services": {
      const data = await fetchTalents();
      return data;
    }
    case "Jobs": {
      const data = await fetchJobs();
      return data;
    }
    default: {
    }
  }
};

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  //color: 'whitesmoke',
  backgroundColor: "gray",
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export default function SearchDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openJobDrawer, setOpenJobDrawer] = React.useState(false);
  const [openServicesDrawer, setOpenServicesDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchOption, setSearchoption] = React.useState("Services");
  const [searchOptions, setSearchoptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<SearchOption | null>(null);
  const [users,setUsers] = React.useState<User[]>([])
  const [jobs,setJobs] = React.useState<any[]>([])

  React.useEffect(() => {
    (async () => {
      const data = await searchOptionsList(searchOption);
     
      setSearchoptions(createSetFromArray(data));
      
    })();
  }, [searchOption]);
  
  let options:SearchOption[] = []
   if(searchOptions.length > 0){
    options = searchOptions.map((option) => {
    const firstLetter = option[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      option,
    };
  });
}
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (label: string) => {
    setSearchoption(label);
    setAnchorEl(null);
  };
  return (
    <Box ml={'1rem'}>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem .0rem",
            padding: ".5rem",
          }}
        >
          <Autocomplete
            id="grouped-demo"
            value={value}
            onChange={async(event: any, newValue: SearchOption | null) => {
              setValue(newValue);
              if(searchOption === 'Services'){
                setOpenServicesDrawer(true)
                const searchValue = newValue?.option as string
                const users = await fetchUsers(searchValue)
                setUsers(users)
               }else{
                setOpenJobDrawer(true)
                const searchValue = newValue?.option as string
                const jobs = await fetchSearchJobs(searchValue)
                setJobs(jobs)
               }
            }}
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option:any) => option.firstLetter}
            getOptionLabel={(option:any) => option.option}
            sx={{ minWidth: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="By categories"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  sx: {
                    //borderRadius: 20,
                    backgroundColor: "whitesmoke",
                    height: 50,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        size="small"
                        endIcon={<ExpandMoreIcon />}
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: 20,
                          border: "1px solid green",
                          heigth: 50,
                          width: "100%",
                        }}
                      >
                        {searchOption}
                      </Button>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
          <Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose("Services")}>
                Services
              </MenuItem>
              <MenuItem onClick={() => handleClose("Jobs")}>Jobs</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        open={openJobDrawer}
        onClose={() => {
          setOpenJobDrawer(false);
        }}
        
      >
                <Container sx={{p:'.5rem',mt:'2rem'}}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>All Jobs in <i>{value?.option}</i> Category</Typography>
          <CancelFloatingActionButtons handleClick={()=>{
             setOpenJobDrawer(false);
          }}/>
          </Box>
          {
            jobs.map((job,i)=>(
             <SearchedJobDetailsAccordion job={job} key={i}/>
            ))
          }
        </Container>
      </Drawer>
        <Drawer
        anchor="right"
        open={openServicesDrawer}
        onClose={() => {
          setOpenServicesDrawer(false);
        }}
        
      >
        <Container sx={{p:'.5rem',mt:'2rem'}}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography>All Talents That Provide <i>{value?.option}</i> Services</Typography>
          <CancelFloatingActionButtons handleClick={()=>{
             setOpenServicesDrawer(false);
          }}/>
          </Box>
         
          {
            users.map((user,i)=>(
              <SWDetailsAccordion sw={user} key={i}/>
            ))
          }
        </Container>
      </Drawer>
    </Box>
  );
}
