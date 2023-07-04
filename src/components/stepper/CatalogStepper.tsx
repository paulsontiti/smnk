import * as React from "react";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function CatalogStepper() {
  const { catalog } = useSelector((state: RootState) => state.swExtra.swExtra);
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = catalog && catalog.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  if (!catalog || catalog.length < 1)
    return (
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
    );
  return (
    <Box>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{catalog[activeStep].title ?? ""}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={10000}
      >
        {catalog &&
          catalog.map((cat: any, index: number) => (
            <Box key={cat.filename}>
              {Math.abs(activeStep - index) <= 2 ? (
                <CatalogCard
                  filename={cat.filename}
                  title={cat.title}
                  description={cat.description}
                  index={index}
                  contentType={cat.contentType ?? ""}
                />
              ) : null}
            </Box>
          ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <AddBottomNavigation
        handleClick={() => {
          router.push("/dashboard/catalog/add");
        }}
        label="Add To Catalog"
      />
    </Box>
  );
}

export default CatalogStepper;
