import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Upgrade } from "./upgrade";
import { useTheme } from "@mui/material/styles";

const platinium = {
  name: "Silver",
  price: 5000,
  benefits: [
    "Own cover page",
    "Access to two extra locations(states)",
    "Second priority access to clients",
    "Free ads on all our social media handles",
  ],
};

export const Platinium = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.smnk[1000],
        color: "white",
        maxHeight: 600,
        minHeight: 600,
        position: "relative",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: "1rem" }}>
          {platinium.name}
        </Typography>
        <Box>
          <Typography
            sx={{ fontWeight: "bold" }}
          >{`NGN ${platinium.price}/month`}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>Benefits:</Typography>
          <ul>
            {platinium.benefits.map((ben, i) => (
              <li key={i}>
                <Typography key={i}>{ben}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </CardContent>
      <Upgrade visibility="Silver" />
    </Card>
  );
};
