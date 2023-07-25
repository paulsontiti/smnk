import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Upgrade } from "./upgrade";
import { useTheme } from "@mui/material/styles";

const gold = {
  name: "Gold",
  price: 2000,
  benefits: [
    "Access to one extra location",
    "Second priority access to clients",
    "Free adds on Facebook and Instagram",
  ],
};
export const Gold = () => {
  const theme = useTheme();
  return (
    <Card sx={{ bgcolor: theme.smnk[500], color: "white", minHeight: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: "1rem" }}>
          {gold.name}
        </Typography>
        <Box>
          <Typography
            sx={{ fontWeight: "bold" }}
          >{`NGN ${gold.price}/month`}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>Benefits:</Typography>
          <ul>
            {gold.benefits.map((ben, i) => (
              <li key={i}>
                <Typography key={i}>{ben}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </CardContent>
      <CardActions>
        <Upgrade visibility="Gold" />
      </CardActions>
    </Card>
  );
};
