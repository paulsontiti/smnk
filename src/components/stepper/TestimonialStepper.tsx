import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import useSWR from "swr";
import { getAllRatings } from "@/lib/testimonials";
import TestimonialDetails from "../testimonials/TestimonialDetails";
import { SmnkErrorBoundary } from "@/pages/_app";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function TestimonialStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { data } = useSWR("getRatings", getAllRatings());

  const maxSteps = data && data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  if (!data) return <p></p>;
  if (Array.isArray(data) && data.length < 1) return <p></p>;
  return (
    <SmnkErrorBoundary>
      <Box
        p={{
          xs: ".5rem",
          sm: "1rem 10rem",
          md: "3rem 12rem",
          lg: "5rem 20rem",
          xl: "5rem 30rem",
        }}
        sx={{ flexGrow: 1, mt: 2 }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          {/* <Typography>{images[activeStep].label}</Typography> */}
          <Typography sx={{ fontWeight: "bold" }}>Testimonials</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000}
        >
          {Array.isArray(data) &&
            data.map((rating: any, index: number) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <TestimonialDetails rating={rating} />
                ) : null}
              </div>
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
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </SmnkErrorBoundary>
  );
}

export default TestimonialStepper;
