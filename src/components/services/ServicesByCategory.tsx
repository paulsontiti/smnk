import { fetchUsers } from "@/lib/search";
import { Container, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingAlert from "../alerts/Loading";
import InfoAlert from "../alerts/Info";
import SWDetailsCard from "../card/SWDetailsCard";

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
          <SWDetailsCard userId={talent.userId} key={talent.userId} />
        ))}
      </Box>
    </Box>
  );
}

export default ServicesByCategory;
