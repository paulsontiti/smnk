import AdminLayout from "@/admin/components/adminLayout";
import SWTable from "@/admin/components/sw/UsersDetailsTable";
import { getAllSkilledWorkers } from "@/lib/sw";
import React from "react";
import useSWR from "swr";
import { Backdrop, CircularProgress,Alert,AlertTitle } from "@mui/material";
import UsersDetailsTable from "@/admin/components/sw/UsersDetailsTable";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";

function SW() {
  const { data, error } = useSWR("getSW", getAllSkilledWorkers());

  if (error)
    return (
      <AdminLayout>
       <ErrorAlert/>
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
      <InfoAlert message="No Skilled Worker available"/>
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
