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
  Button,
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
import SearchedJobDetailsAccordion from "../accordion/SearchedJobDetailsAccordion";
import CancelFloatingActionButtons from "../fab/Cancel";
import SWDetailsCard from "../card/SWDetailsCard";
import { theme } from "@/pages/_app";
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

export const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  //color: 'whitesmoke',
  backgroundColor: "gray",
}));

export const GroupItems = styled("ul")({
  padding: 0,
});

export const getSearchOptions = (searchOptions: string[]) => {
  let options: SearchOption[] = [];
  if (searchOptions) {
    options = searchOptions.map((option) => {
      if (option) {
        const firstLetter = option[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
          option,
        };
      }
      return { firstLetter: "", option: "" };
    });
  }
  return options;
};

export default function SearchDrawer({ footer }: { footer: boolean }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openJobDrawer, setOpenJobDrawer] = React.useState(false);
  const [openServicesDrawer, setOpenServicesDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchOption, setSearchoption] = React.useState("Services");
  const [searchOptions, setSearchoptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<SearchOption | null>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [jobs, setJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const data = await searchOptionsList(searchOption);

      setSearchoptions(createSetFromArray(data));
    })();
  }, [searchOption]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (label: string) => {
    setSearchoption(label);
    setAnchorEl(null);
  };
  return (
    <Box>
      {footer ? (
        <>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            sx={{ textTransform: "lowercase", color: "white" }}
            onClick={handleMenu}
          >
            Search
          </Button>
        </>
      ) : (
        <IconButton onClick={handleMenu} sx={{ color: theme.smnk[1000] }}>
          <SearchIcon />
        </IconButton>
      )}
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
        <SearchBox
          value={value}
          setJobs={setJobs}
          setOpenJobDrawer={setOpenJobDrawer}
          setOpenServicesDrawer={setOpenServicesDrawer}
          setUsers={setUsers}
          setValue={setValue}
          options={getSearchOptions(searchOptions)}
          searchOption={searchOption}
        />
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
                <SWDetailsCard key={i} userId={user.userId} />
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
function SearchBox({
  value,
  setValue,
  searchOption,
  setOpenServicesDrawer,
  setUsers,
  setOpenJobDrawer,
  options,
  setJobs,
}: {
  value: SearchOption | null;
  setValue: any;
  searchOption: string;
  setOpenServicesDrawer: any;
  setUsers: any;
  setOpenJobDrawer: any;
  options: any;
  setJobs: any;
}) {
  return (
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

              const { data } = await fetchSearchJobs(searchValue);
              setJobs(data);
            }
          }
        }}
        options={options.sort(
          (a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option: any) => option.firstLetter}
        getOptionLabel={(option: any) => option.option}
        sx={{ minWidth: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="search by categories"
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
  );
}
