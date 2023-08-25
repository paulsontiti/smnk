import { fetchUsers } from "@/lib/search";
import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import { SmnkErrorBoundary } from "@/pages/_app";
import SWDetailsNoCollapse from "../card/SWDetailsNoCollapse";

function ServicesByCategory({ category }: { category: string }) {
  const [talents, setTalent] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchUsers(category);
      setTalent(data);
    })();
  }, [category]);
  if (!talents) return <LoadingAlert />;
  if (talents && talents.length < 1)
    return <InfoAlert message="No Information available" />;
  return (
    <SmnkErrorBoundary>
      <Box>
        <Typography
          fontWeight={"bold"}
          textTransform={"capitalize"}
          mt={2}
          mb={2}
        >
          {category}
        </Typography>
        <Box
          display={"flex"}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          flexDirection={{ xs: "column", sm: "row" }}
          flexWrap={"wrap"}
        >
          {talents.map((talent, i) => (
            <SWDetailsNoCollapse
              forClient={true}
              userId={talent.userId}
              key={talent.userId}
            />
          ))}
        </Box>
      </Box>
    </SmnkErrorBoundary>
  );
}

export default ServicesByCategory;
