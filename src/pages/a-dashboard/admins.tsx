import AdminLayout from "@/admin/components/adminLayout";
import React from "react";
import { SmnkErrorBoundary } from "../_app";
import ErrorAlert from "@/components/alerts/Error";
import { getAdmins } from "@/lib/sw";
import useSWR from "swr";
import { Backdrop, CircularProgress } from "@mui/material";
import InfoAlert from "@/components/alerts/Info";
import AdminsTable from "@/admin/components/AdminsTable";

const Admins = () => {
  const { data, error } = useSWR("getAdmins", getAdmins());
  if (error)
    return (
      <AdminLayout>
        <ErrorAlert />
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
        <InfoAlert message="No other admin" />
      </AdminLayout>
    );
  return (
    <AdminLayout>
      <SmnkErrorBoundary>
        <AdminsTable users={data} />
      </SmnkErrorBoundary>
    </AdminLayout>
  );
};

export default Admins;
