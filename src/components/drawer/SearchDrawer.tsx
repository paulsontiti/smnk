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
import SearchBox from "../autoComplete/SearchBox";
import LoadingAlert from "../alerts/Loading";
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
  if (searchOptions.length > 0) {
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

export default function SearchDrawer({
  searchOption,
}: {
  searchOption: string;
}) {
  const [openJobDrawer, setOpenJobDrawer] = React.useState(false);
  const [openServicesDrawer, setOpenServicesDrawer] = React.useState(false);
  const [searchOptions, setSearchoptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<SearchOption | null>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loadingJob, setLoadingJob] = React.useState(true);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const data = await searchOptionsList(searchOption);

      setSearchoptions(createSetFromArray(data));
    })();
  }, [searchOption]);

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = (label: string) => {
  //   setSearchoption(label);
  //   setAnchorEl(null);
  // };
  return (
    <Box mt={3} mb={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
                setLoadingUser(true);
                setOpenServicesDrawer(true);

                const users = await fetchUsers(searchValue);
                setLoadingUser(false);
                setUsers(users);
              }
            } else {
              const searchValue = newValue?.option as string;
              if (searchValue) {
                setLoadingJob(true);
                setOpenJobDrawer(true);

                const { data } = await fetchSearchJobs(searchValue);
                setLoadingJob(false);
                setJobs(data);
              }
            }
          }}
          options={getSearchOptions(searchOptions).sort(
            (a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option: any) => option.firstLetter}
          getOptionLabel={(option: any) => option.option}
          sx={{
            minWidth: { xs: 300, sm: 400 },
            maxWidth: { xs: 300, sm: 400 },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`search ${searchOption.toLowerCase()} by categories`}
              InputProps={{
                ...params.InputProps,
                type: "search",
                sx: {
                  borderRadius: "30px",
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

      <Drawer
        anchor="left"
        open={openJobDrawer}
        onClose={() => {
          setOpenJobDrawer(false);
        }}
      >
        {loadingJob ? (
          <LoadingAlert />
        ) : (
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
        )}
      </Drawer>
      <ServicesDrawer
        openServicesDrawer={openServicesDrawer}
        setOpenServicesDrawer={setOpenServicesDrawer}
        searchedService={value?.option}
        users={users}
        loadingUser={loadingUser}
      />
    </Box>
  );
}

export function ServicesDrawer({
  searchedService,
  users,
  loadingUser,
  openServicesDrawer,
  setOpenServicesDrawer,
}: {
  searchedService: string | undefined;
  users: any[];
  loadingUser: boolean;
  openServicesDrawer: boolean;
  setOpenServicesDrawer: any;
}) {
  return (
    <Drawer
      anchor="right"
      open={openServicesDrawer}
      onClose={() => {
        setOpenServicesDrawer(false);
      }}
    >
      {loadingUser ? (
        <LoadingAlert />
      ) : (
        <Container sx={{ p: ".5rem", mt: "2rem" }}>
          {users && users.length > 0 ? (
            <>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>
                  All Services in <i>{searchedService}</i> Category
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
              No Services in <i>{searchedService} category</i>
            </Typography>
          )}
        </Container>
      )}
    </Drawer>
  );
}
