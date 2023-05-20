import AdminLayout from "@/admin/components/adminLayout";
import React from "react";
import useSWR from "swr";
import { Backdrop, CircularProgress,Alert,AlertTitle } from "@mui/material";
import UsersDetailsTable from "@/admin/components/sw/UsersDetailsTable";
import { getAllClients } from "@/lib/clients";

function SW() {
  const { data, error } = useSWR("getClients", getAllClients());

  if (error)
    return (
      <AdminLayout>
        <Alert severity="error">
          <AlertTitle>Server Error</AlertTitle>
          An Error occurred fetching data from the server — <strong>Please try again or refresh the page</strong>
        </Alert>
      </AdminLayout>
    );
  if (!data)
    return (
      <AdminLayout>
        
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!data}
        >
          <CircularProgress color="info" />
        </Backdrop>
      </AdminLayout>
    );
  if (Array.isArray(data) && data.length < 1)
    return (
      <AdminLayout>
        <Alert severity="info">
          <AlertTitle>Server Error</AlertTitle>
          An Error occurred fetching data from the server — <strong>Please try again or refresh the page</strong>
        </Alert>
      </AdminLayout>
    );
  //console.log(data)
  return (
    <AdminLayout>
      <UsersDetailsTable users={data}/>
    </AdminLayout>
  );
}

export default SW;
