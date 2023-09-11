import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Upgrade } from "./upgrade";
import { useTheme } from "@mui/material/styles";

const gold = {
  name: "Gold",
  price: 20000,
  benefits: [
    "Own cover page",
    "Access to three extra location",
    "Top priority access to clients",
    "Free adds on Facebook and Instagram",
  ],
};
export const Gold = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: theme.smnk[500],
        color: "white",
        maxHeight: 600,
        minHeight: 600,
        position: "relative",
      }}
    >
      <CardContent>
        <ListItemButton
          sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: "1rem" }}
        >
          {gold.name}
          <Chip
            color="success"
            sx={{
              minHeight: 20,
              fontSize: "xs2",
              position: "absolute",
              top: -5,
              ml: 7,
            }}
            label="Recommended"
          />
        </ListItemButton>
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
