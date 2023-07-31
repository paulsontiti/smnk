import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { SmnkErrorBoundary } from "@/pages/_app";

interface AdDetails {
  title: string;
  message: string;
  landingPage: string;
  src: string;
}

export default function AdvertCard({
  title,
  message,
  landingPage,
  src,
  actionText,
}: {
  title: string;
  message: string;
  src: string;
  landingPage: string;
  actionText: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Box
        m={1}
        display={"center"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={2}
      >
        <Card sx={{ maxWidth: "100%" }}>
          <CardMedia sx={{ height: 400 }} image={src} title={title} />
          <CardContent>
            <Typography
              fontWeight={"bold"}
              textTransform={"capitalize"}
              mt={1}
              mb={1}
            >
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ textTransform: "capitalize", color: "#04023B" }}
              onClick={() => {
                window.location.href = landingPage;
              }}
            >
              {actionText}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </SmnkErrorBoundary>
  );
}
