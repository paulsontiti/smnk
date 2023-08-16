import AdminLayout from "@/admin/components/adminLayout";
import NotificationForm from "@/admin/components/notification/NotificationForm";

import { Container } from "@mui/material";
import React from "react";

function CreateNotificationPage() {
  return (
    <AdminLayout>
      <Container
        fixed
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationForm />
      </Container>
    </AdminLayout>
  );
}

export default CreateNotificationPage;
