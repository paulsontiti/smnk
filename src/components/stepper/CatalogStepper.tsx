import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useRouter } from "next/router";
import InfoAlert from "../alerts/Info";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CatalogCard from "../card/CatalogCard";
import { Typography } from "@mui/material";
import AddBottomNavigation from "../bottomNavigation/AddBottomNavigation";
import LoadingAlert from "../alerts/Loading";
import { SmnkErrorBoundary } from "@/pages/_app";
import CatalogDisplayStepper from "./CatalogDisplayStepper";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CatalogStepper() {
  const { catalog } = useSelector((state: RootState) => state.swExtra.swExtra);
  const [cat, setCat] = useState<any | null>(null);
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    setCat(catalog);
  }, [catalog]);
  const maxSteps = cat && cat.length;
  if (cat === null) return <LoadingAlert />;
  if (cat === undefined || cat.length === 0)
    return (
      <SmnkErrorBoundary>
        <Box mt={5} ml={2}>
          <InfoAlert message="No Catalog. Create one" />{" "}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              router.push("/dashboard/catalog/add");
            }}
            sx={{
              textTransform: "capitalize",
              m: 2,
            }}
          >
            Create Catalog
          </Button>
        </Box>
      </SmnkErrorBoundary>
    );

  return (
    <Box
      mt={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      p={2}
    >
      <Typography variant="h6">Catalogue</Typography>
      <CatalogDisplayStepper catalog={catalog} forClient={false} />
    </Box>
  );
}

export default CatalogStepper;
