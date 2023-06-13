import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import ServiceAccordion from "@/components/accordion/ServiceAccordion";
import AddFloatingActionButtons from "@/components/fab/Add";
import InfoAlert from "@/components/alerts/Info";

export default function Service() {
  const router = useRouter();
  const {
    user: { services },
  } = useSelector((state: RootState) => state.users);
  if (services && services.length < 1)
    return (
    
      <InfoAlert message="  No Services. Please Add a Service"/>
    );

  return (
    <Container sx={{p:{sm:'2rem 5rem',md:'2rem 10rem', lg:'2rem 15rem',xl:'2rem 20rem'}}}>
      <Typography sx={{ margin: "1rem 1rem", fontWeight: "bold" }}>
        Your Services
      </Typography>
      {Array.isArray(services) &&
        services.map((serv: any, i: number) => (
          <ServiceAccordion
            serv={serv}
            key={i}
            index={i}
            services={services}
          />
        ))}
      {services && services.length < 2 && (
        <AddFloatingActionButtons  handleClick={()=>{
          router.push(`/sw-dashboard/service/add-service`)
        }}/>
      )}
    </Container>
  );
}
