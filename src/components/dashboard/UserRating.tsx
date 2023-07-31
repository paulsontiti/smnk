import React from "react";
import { Rating, Badge } from "@mui/material";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { SmnkErrorBoundary } from "@/pages/_app";

function UserRating({
  type,
  level,
  rating,
}: {
  rating: number;
  type: string;
  level: string;
}) {
  return (
    <SmnkErrorBoundary>
      <Badge
        badgeContent={type === "skilled worker" && <Level level={level} />}
        sx={{ m: 2 }}
      >
        <Rating name="read-only" value={rating} readOnly size="small" />
      </Badge>
    </SmnkErrorBoundary>
  );
}

export default UserRating;

function Level({ level }: { level: string }) {
  if (level === "Intermediate") return <LocalPoliceIcon />;
  if (level === "Pro") return <MilitaryTechIcon />;
  return <ChildCareIcon />;
}
