import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { SmnkErrorBoundary, theme } from "@/pages/_app";
import InfoAlert from "../alerts/Info";
import Comments from "../job/Comments";
import CatalogDisplayStepper from "../stepper/CatalogDisplayStepper";
import { BlackTypography } from "../card/ClientJobDetailsCard";
import Experience from "@/lib/types/experience";

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
          <Typography color={theme.smnk[1200]}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function UserDetailsTab({
  services,
  forClient,
  experiences,
  skills,
  userId,
  catalogue,
}: {
  services: any[];
  forClient: boolean;
  experiences: any[];
  skills: any[];
  userId: string;
  catalogue: any[];
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <SmnkErrorBoundary>
      <Box
        sx={{ bgcolor: "background.paper", minWidth: "100%" }}
        color={theme.smnk[1200]}
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
          <Tab label="Services" />
          <Tab label="Skills" />
          <Tab label="Experiences" />
          <Tab label="Catalogue" />
          <Tab label="Reviews" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {Array.isArray(services) && services.length > 0 ? (
              <>
                {services.map((service, index) => (
                  <BlackListDisplay key={index} label={service.title} />
                ))}
              </>
            ) : (
              <InfoAlert message="No Services added" />
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            {Array.isArray(skills) && skills.length > 0 ? (
              <>
                {skills.map((skill, index) => (
                  <BlackListDisplay key={index} label={skill} />
                ))}
              </>
            ) : (
              <InfoAlert message="No Skills added" />
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {Array.isArray(experiences) && experiences.length > 0 ? (
              <>
                {experiences.map((exp) => (
                  <ExperienceDetailsCard exp={exp} key={exp._id} />
                ))}
              </>
            ) : (
              <InfoAlert message="No Experience added" />
            )}
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <CatalogDisplayStepper catalog={catalogue} forClient={forClient} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <Comments userId={userId} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </SmnkErrorBoundary>
  );
}

export function BlackListDisplay({
  key,
  label,
}: {
  key: string | number;
  label: string;
}) {
  return (
    <Box
      key={key}
      bgcolor={"whitesmoke"}
      display={"flex"}
      alignItems={"center"}
      gap={2}
      mb={1}
      p={1}
      maxWidth={"90%"}
    >
      <Box
        width={10}
        height={10}
        bgcolor={theme.smnk[1200]}
        borderRadius={"50%"}
      ></Box>
      <Typography color={theme.smnk[1200]} textTransform={"capitalize"}>
        {label}
      </Typography>
    </Box>
  );
}
export function ExperienceDetailsCard({ exp }: { exp: Experience }) {
  if (!exp) return <p></p>;
  return (
    <Card
      sx={{
        minWidth: "95%",
        m: 1,
      }}
    >
      <BlackTypography label="Role Title" value={exp.title} />
      <BlackTypography label="State" value={exp.state} />
      <BlackTypography label="L.G.A" value={exp.lga} />
      <BlackTypography label="Address" value={exp.address} />
      <BlackTypography
        label="Start Date"
        value={new Date(exp.startDate).toDateString()}
      />
      <BlackTypography
        label="End Date"
        value={
          exp.onRole ? "On Role" : new Date(exp.endDate as any).toDateString()
        }
      />
    </Card>
  );
}
