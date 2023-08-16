import AdminLayout from "@/admin/components/adminLayout";
import { getAllSkilledWorkers } from "@/lib/sw";
import React from "react";
import useSWR from "swr";
import { Backdrop, CircularProgress } from "@mui/material";
import UsersDetailsTable from "@/admin/components/sw/UsersDetailsTable";
import ErrorAlert from "@/components/alerts/Error";
import InfoAlert from "@/components/alerts/Info";
import { SmnkErrorBoundary } from "@/pages/_app";

function SW() {
  const { data, error } = useSWR("getSW", getAllSkilledWorkers());

  if (error)
    return (
      <AdminLayout>
        <ErrorAlert message={error.message} />
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
        <InfoAlert message="No Skilled Worker available" />
      </AdminLayout>
    );
  //console.log(data)
  return (
    <AdminLayout>
      <SmnkErrorBoundary>
        <UsersDetailsTable users={data} />
      </SmnkErrorBoundary>
    </AdminLayout>
  );
}

export default SW;
