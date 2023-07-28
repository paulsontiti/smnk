import { createSetFromArray, fetchTalents } from "@/lib/search";
import React, { useEffect, useState } from "react";
import ServicesByCategory from "./ServicesByCategory";
import { Container, Typography } from "@mui/material";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";

function AllServices() {
  const [services, setServices] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTalents();
      setServices(createSetFromArray(data.flat().sort()));
    })();
  }, []);
  console.log(services);
  if (!services) return <LoadingAlert />;
  if (services.length < 1) return <InfoAlert message="No Services Available" />;
  return (
    <Container>
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
  );
}

export default AllServices;
