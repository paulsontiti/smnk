import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Upgrade } from "./upgrade";
import { useTheme } from "@mui/material/styles";

const bronze = {
  name: "Bronze",
  price: 1000,
  benefits: [
    "Access to one extra location",
    "20 viewership from clients within your location",
    "Three(3) free adds on Facebook",
  ],
};
export const Bronze = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.smnk[200],
        maxHeight: 600,
        minHeight: 600,
        position: "relative",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: "1rem" }}>
          {bronze.name}
        </Typography>
        <Box>
          <Typography
            sx={{ fontWeight: "bold" }}
          >{`NGN ${bronze.price}/month`}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>Benefits:</Typography>
          <ul>
            {bronze.benefits.map((ben, i) => (
              <li key={i}>
                <Typography key={i}>{ben}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </CardContent>
      <CardActions>
        <Upgrade visibility="Bronze" />
      </CardActions>
    </Card>
  );
};
