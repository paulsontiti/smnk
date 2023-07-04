import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ServiceAccordion from "@/components/accordion/ServiceAccordion";
import AddFloatingActionButtons from "@/components/fab/Add";
import InfoAlert from "@/components/alerts/Info";
import LoadingAlert from "@/components/alerts/Loading";

export default function Service() {
  const router = useRouter();
  const { services } = useSelector((state: RootState) => state.swExtra.swExtra);
  if (!services) return <LoadingAlert />;

  return (
    <Container
      sx={{
        p: {
          sm: "2rem 5rem",
          md: "2rem 10rem",
          lg: "2rem 15rem",
          xl: "2rem 20rem",
        },
      }}
    >
      <Typography sx={{ margin: "1rem 1rem", fontWeight: "bold" }}>
        Your Services
      </Typography>
      {services.length > 0 ? (
        services.map((serv: any, i: number) => (
          <ServiceAccordion serv={serv} key={i} index={i} services={services} />
        ))
      ) : (
        <InfoAlert message="No services. Please create one" />
      )}
      {services && services.length < 2 && (
        <AddFloatingActionButtons
          handleClick={() => {
            router.push(`/sw-dashboard/service/add-service`);
          }}
        />
      )}
    </Container>
  );
}
