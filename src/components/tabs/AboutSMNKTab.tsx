import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {CardActions, Button } from "@mui/material";
import {useRouter} from 'next/router'
import { CEO } from "@/pages/team";
import { ColorPaletteProp, Sheet } from "@mui/joy";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default function AboutSMNKTab() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [color, setColor] = React.useState<ColorPaletteProp>("primary");


const router= useRouter()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== "warning" && {
          bgcolor: `${color}.900`,position:'static'
        }),
        flexGrow: 1,
        borderRadius: { xs: 0, sm: "xs" },
        m:'0 0 1rem 0'
      }}
    >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          textColor="inherit"
        >
          <Tab label="About SMNK" />
          <Tab label="Our Objective" />
          <Tab label="Our Mission" />
          <Tab label="Our Vision" />
          <Tab label="Our Team" />
        </Tabs>
      </Sheet>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          SMNK is a service-based platform that connects professionals and
          skilled workers to their target audience. As an intermediary, we help
          to solve the challenges of getting your preferred and reliable skilled
          workers/service providers from the comfort of your home or when in
          urgent need of someone reliable to salvage a situation.
          <CardActions>
            <Button size="small" sx={{ textTransform: "capitalize"}}
            onClick={()=>{
              router.push('/about-us')
            }}>
              Read More
            </Button>
          </CardActions>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <ol>
            <li>
              An online service platform which connects service
              providers/skilled workers with persons who require their services
              thereby curbing the rate of unemployment in Nigeria.
            </li>
            <li>
              To connect talented skilled workers with a wide range of
              opportunities.
            </li>
            <li>
              To create an online freelancing hub where individuals can work and
              earn money.
            </li>
            <li>
              To provide individuals who require skilled workers/service
              providers with excellent value for their money.
            </li>
            <li>
              To reduce the stress of negotiation between skilled workers and
              their employers.
            </li>
          </ol>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          To be the earth’s most friendly customer base; where top-notch online
          professionals carry out hands on businesses with the sole aim of
          connecting clients to their preferred/needed services and products and
          where jobs are delivered efficiently and effectively.
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          To be a tenaciously dedicated company with integrity and vitality,
          passion and aliveness via continual-progressive innovation thus
          ensuring that customers’ satisfaction is not compromised but
          guaranteed.
          <Typography mt={1} mb={1} fontWeight={"bold"}>
            {" "}
            Value Statement:
          </Typography>{" "}
          We are dogged, highly responsible, efficiently effective, accountable,
          and steward-inclined; we learn progressively and continually, we have
          a winning mentality, we don’t give up, we foster trust in customers
          and assure quality, we are SMNK.
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
       <CEO/>
          <CardActions>
            <Button size="small" sx={{ textTransform: "capitalize" }}
            onClick={()=>{
              router.push('/team')
            }}>
              Read More
            </Button>
          </CardActions>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
