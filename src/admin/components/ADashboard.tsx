import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import LogoutSwitch from "@/components/switch/LogoutSwitch";
import { Badge, Box, Divider } from "@mui/material";
import DP from "@/components/dashboard/dp";
import { getCountOfPendingRequest } from "@/lib/types/job";
import useSWR from "swr";

export default function ADashboardMenu() {
  const router = useRouter();

  return (
    <Box bgcolor={"whitesmoke"}>
      {" "}
      <DP />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          pl: 0,
          overflowY: "auto",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push("/a-dashboard/job");
          }}
        >
          <ListItemText primary="Jobs" />
        </ListItemButton>{" "}
        <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/sw`);
          }}
        >
          <ListItemText primary="Skilled Workers" />
        </ListItemButton>{" "}
        <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/clients`);
          }}
        >
          <ListItemText primary="Clients" />
        </ListItemButton>{" "}
        <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/notification/create`);
          }}
        >
          <ListItemText primary="Notifications" />
        </ListItemButton>{" "}
        <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/chat`);
          }}
        >
          <ListItemText primary="Chats" />
        </ListItemButton>{" "}
        <Divider />
        <WithdrawalRequest /> <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/add-a-user`);
          }}
        >
          <ListItemText primary="Add A User" />
        </ListItemButton>{" "}
        <Divider />
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/admins`);
          }}
        >
          <ListItemText primary="Admins" />
        </ListItemButton>{" "}
        <Divider />
        <Box ml={3}>
          <LogoutSwitch />
        </Box>
      </List>
    </Box>
  );
}

function WithdrawalRequest() {
  const { data, error } = useSWR(
    "getCountOfPendingRequest",
    getCountOfPendingRequest()
  );
  const router = useRouter();

  if (error)
    return (
      <ListItemButton
        sx={{ ml: 1 }}
        onClick={() => {
          router.push(`/a-dashboard/withdrawal/request`);
        }}
      >
        <ListItemText primary="Withdrawal Request" />
      </ListItemButton>
    );

  return (
    <Box mt={2}>
      <Badge badgeContent={data} color="error">
        <ListItemButton
          sx={{ ml: 1 }}
          onClick={() => {
            router.push(`/a-dashboard/withdrawal/request`);
          }}
        >
          <ListItemText primary="Withdrawal Request" />
        </ListItemButton>{" "}
      </Badge>
    </Box>
  );
}
