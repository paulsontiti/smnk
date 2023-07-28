import { createSetFromArray, fetchTalents } from "@/lib/search";
import React, { useEffect, useState } from "react";
import ServicesByCategory from "./ServicesByCategory";
import { Container, Typography } from "@mui/material";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";

function AllServices() {
  const [services, setServices] = useState<any[] | null | undefined>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTalents();
      console.log("data", data);
      if (data) {
        setServices(createSetFromArray(data.flat().sort()));
      } else {
        setServices(data);
      }
    })();
  }, []);

  if (services === null) return <LoadingAlert />;
  if (services === undefined)
    return <InfoAlert message="No Services Available" />;
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
