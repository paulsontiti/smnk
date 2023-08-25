import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ServiceAccordion from "@/components/accordion/ServiceAccordion";
import AddFloatingActionButtons from "@/components/fab/Add";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";
import { useState, useEffect } from "react";
import { SmnkErrorBoundary } from "@/pages/_app";

export default function Service() {
  const router = useRouter();
  const { services } = useSelector((state: RootState) => state.swExtra.swExtra);
  const [servs, setServs] = useState<any>(null);

  useEffect(() => {
    setServs(services);
  }, [services]);
  if (servs === null) return <LoadingAlert />;
  if (servs === undefined || servs.length === 0)
    return <InfoAlert message="No services. Please create one" />;
  return (
    <SmnkErrorBoundary>
      <Box width={"100%"} p={2} mt={5}>
        <Typography sx={{ fontWeight: "bold" }}>Your Services</Typography>
        {services.map((serv: any, i: number) => (
          <ServiceAccordion serv={serv} key={i} index={i} services={services} />
        ))}
        {services && services.length < 2 && (
          <AddFloatingActionButtons
            handleClick={() => {
              router.push(`/sw-dashboard/service/add-service`);
            }}
          />
        )}
      </Box>
    </SmnkErrorBoundary>
  );
}
