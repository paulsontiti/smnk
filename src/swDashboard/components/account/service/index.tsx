import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import ServiceAccordion from "@/components/accordion/ServiceAccordion";
import AddFloatingActionButtons from "@/components/fab/Add";

export default function Service() {
  const router = useRouter();
  const {
    user: { services },
  } = useSelector((state: RootState) => state.users);

  if (services && services.length < 1)
    return (
      <Typography sx={{ margin: "1rem 1rem" }} variant="caption" component="p">
        No Services. Please Add a Service
      </Typography>
    );

  return (
    <Box>
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
      {services.length < 2 && (
        <AddFloatingActionButtons  handleClick={()=>{
          router.push(`/sw-dashboard/service/add-service`)
        }}/>
      )}
    </Box>
  );
}
