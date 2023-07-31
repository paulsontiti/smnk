import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { Service } from "@/lib/types/service";
import EditFloatingActionButtons from "../fab/Edit";
import { useRouter } from "next/router";
import { SmnkErrorBoundary } from "@/pages/_app";

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
      <Accordion sx={{ margin: "1rem 1rem" }}>
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
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: "bold" }}>Category:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{serv.category}</Typography>
                </Grid>
              </Grid>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>Skills: </Typography>

                <ul>
                  {Array.isArray(serv.skills) &&
                    serv.skills.map((skill: string, i: number) => (
                      <li key={i}>
                        <Typography>{skill}</Typography>
                      </li>
                    ))}
                </ul>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  Description:{" "}
                </Typography>

                <p>{serv.description}</p>
                {/* <Box sx={{maxWidth:'100%',minWidth:'100%',overflowWrap:"break-word",inlineSize: 'min-content'}}>{d.description}</Box> */}
              </Box>
            </CardContent>
            <CardActions>
              {index && (
                <EditFloatingActionButtons
                  handleClick={() => {
                    router.push(`/sw-dashboard/service/edit-service/${index}`);
                  }}
                />
              )}
            </CardActions>
          </Card>
        </AccordionDetails>
      </Accordion>
    </SmnkErrorBoundary>
  );
}

export default ServiceAccordion;
