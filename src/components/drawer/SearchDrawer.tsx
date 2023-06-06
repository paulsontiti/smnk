import * as React from "react";
import {
  IconButton,
  Drawer,
  Box,
  Menu,
  MenuItem,
  TextField,
  Autocomplete,
  Container,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {
  createSetFromArray,
  fetchJobs,
  fetchSearchJobs,
  fetchTalents,
  fetchUsers,
} from "@/lib/search";
import { styled } from "@mui/system";
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
  const [users, setUsers] = React.useState<User[]>([]);
  const [jobs, setJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const data = await searchOptionsList(searchOption);

      setSearchoptions(createSetFromArray(data));
    })();
  }, [searchOption]);

  let options: SearchOption[] = []
  if(searchOptions){
   options = searchOptions.map((option) => {
    if(option){
      const firstLetter = option[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      option,
    };
  }
  return {firstLetter:'',option:''}
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
    <Box ml={"1rem"}>
      <IconButton
        onClick={
          //() => {
          handleMenu
          //setOpenDrawer(!openDrawer);
        }
        //}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <SearchIcon />
      </IconButton>
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
          <MenuItem
            onClick={() => {
              handleClose("Services");
              setOpenDrawer(true);
            }}
          >
            Search For Services
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose("Jobs");
              setOpenDrawer(true);
            }}
          >
            Search For Jobs
          </MenuItem>
        </Menu>
      </Box>
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
            onChange={async (event: any, newValue: SearchOption | null) => {
              setValue(newValue);
              if (searchOption === "Services") {
                const searchValue = newValue?.option as string;
                if (searchValue) {
                  setOpenServicesDrawer(true);

                  const users = await fetchUsers(searchValue);
                  setUsers(users);
                }
              } else {
                const searchValue = newValue?.option as string;
                if (searchValue) {
                  setOpenJobDrawer(true);

                  const jobs = await fetchSearchJobs(searchValue);
                  setJobs(jobs);
                }
              }
            }}
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option: any) => option.firstLetter}
            getOptionLabel={(option: any) => option.option}
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
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        open={openJobDrawer}
        onClose={() => {
          setOpenJobDrawer(false);
        }}
      >
        <Container sx={{ p: ".5rem", mt: "2rem" }}>
          {jobs && jobs.length > 0 ? (
            <>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>
                  All Jobs in <i>{value?.option}</i> Category
                </Typography>
                <CancelFloatingActionButtons
                  handleClick={() => {
                    setOpenJobDrawer(false);
                  }}
                />
              </Box>
              {jobs.map((job, i) => (
                <SearchedJobDetailsAccordion job={job} key={i} />
              ))}
            </>
          ) : (
            <Typography>
              No Jobs in <i>{value?.option} category</i>
            </Typography>
          )}
        </Container>
      </Drawer>
      <Drawer
        anchor="right"
        open={openServicesDrawer}
        onClose={() => {
          setOpenServicesDrawer(false);
        }}
      >
         <Container sx={{ p: ".5rem", mt: "2rem" }}>
          {users && users.length > 0 ? (
            <>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>
                  All Services in <i>{value?.option}</i> Category
                </Typography>
                <CancelFloatingActionButtons
                  handleClick={() => {
                    setOpenServicesDrawer(false);
                  }}
                />
              </Box>
              {users.map((user, i) => (
                <SWDetailsAccordion sw={user} key={i} />
              ))}
            </>
          ) : (
            <Typography>
              No Services in <i>{value?.option} category</i>
            </Typography>
          )}
        </Container>
      </Drawer>
    </Box>
  );
}
// startAdornment: (
//   <InputAdornment position="start">
//     <Button
//       size="small"
//       endIcon={<ExpandMoreIcon />}
//       aria-label="account of current user"
//       aria-controls="menu-appbar"
//       aria-haspopup="true"
//       onClick={handleMenu}
//       sx={{
//         textTransform: "capitalize",
//         borderRadius: 20,
//         border: "1px solid green",
//         heigth: 50,
//         width: "100%",
//       }}
//     >
//       {searchOption}
//     </Button>
//   </InputAdornment>
// ),
