import { createSetFromArray, fetchTalents } from "@/lib/search";
import React, { useEffect, useState } from "react";
import ServicesByCategory from "./ServicesByCategory";
import { Container, Typography } from "@mui/material";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import { SmnkErrorBoundary } from "@/pages/_app";

function AllServices() {
  const [services, setServices] = useState<any[] | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const data = await fetchTalents();
      if (Array.isArray(data) && data.length > 0) {
        setServices(createSetFromArray(data.flat().sort()));
      } else {
        setServices(data);
      }
    })();
  }, []);
  if (services === undefined) return <LoadingAlert />;
  if (services === null || !Array.isArray(services) || services.length === 0)
    return <InfoAlert message="No Services Available" />;
  return (
    <SmnkErrorBoundary>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          fontWeight={"bold"}
          textTransform={"capitalize"}
          mt={5}
          mb={5}
        >
          All Services By Categories
        </Typography>
        {services.map((serv, i) => (
          <ServicesByCategory category={serv} key={i} />
        ))}
      </Container>
    </SmnkErrorBoundary>
  );
}

export default AllServices;
