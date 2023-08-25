import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardActions,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { Service } from "@/lib/types/service";
import EditFloatingActionButtons from "../fab/Edit";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";
import {
  BlackDescription,
  BlackTypography,
} from "../card/ClientJobDetailsCard";
import { BlackListDisplay } from "../tabs/UserDetailsTab";

function ServiceAccordion({
  serv,
  index,
}: {
  serv: Service;
  index: number;
  services: Service[];
}) {
  const router = useRouter();
  if (!serv) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ textTransform: "capitalize" }}>
            {serv.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BlackTypography label="Category" value={serv.category} />
          <Box p={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Skills
            </Typography>
            {Array.isArray(serv.skills) &&
              serv.skills.map((skill: string, i: number) => (
                <BlackListDisplay key={i} label={skill} />
              ))}
          </Box>
          <BlackDescription
            label="Description"
            description={serv.description}
          />
          <CardActions>
            {!isNaN(index) && (
              <EditFloatingActionButtons
                handleClick={() => {
                  router.push(`/sw-dashboard/service/edit-service/${index}`);
                }}
              />
            )}
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}

export default ServiceAccordion;
