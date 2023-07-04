import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Upgrade } from "./upgrade";
import { Chip, ListItemButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const platinium = {
  name: "Platinium",
  price: 5000,
  benefits: [
    "Own cover page",
    "Access to more locations(states)",
    "Top priority access to clients",
    "Free ads on all our social media handles",
  ],
};

export const Platinium = () => {
  const theme = useTheme();
  return (
    <Card sx={{ bgcolor: theme.smnk[1000], color: "white" }}>
      <CardContent>
        <ListItemButton
          sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: "1rem" }}
        >
          {platinium.name}
          <Chip
            color="success"
            sx={{
              minHeight: 20,
              fontSize: "xs2",
              position: "absolute",
              top: -5,
              ml: 13,
            }}
            label="Recommended"
          />
        </ListItemButton>
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
      <CardActions>
        <Upgrade visibility="Platinium" />
      </CardActions>
    </Card>
  );
};
