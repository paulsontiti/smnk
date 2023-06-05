import { RootState } from "@/store";
import { Chip } from "@mui/joy";
import { ListItemButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function VisibilityLink() {
  const router = useRouter();
  const [subType, setSubType] = useState("");
  const { _id } = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/multer/sub/type`,
        data: { _id },
      });
      const subType = await res.data;
      setSubType(subType);
    })();
  }, [_id]);
  if (subType === 'free')
    return (
      <ListItemButton
        sx={{ ml: 4 }}
        onClick={() => {
          router.push("/sw-dashboard/visibility");
        }}
      >
        Boost Visibility
        <Chip
        color="success"
          variant="soft"
          size="sm"
          sx={{
            minHeight: 20,
            fontSize: "xs2",
            position: "absolute",
            top: -8,
            ml: 10,
          }}
        >
          Recommended
        </Chip>
      </ListItemButton>
    );
  return (
    <ListItemButton sx={{ ml: 4 }}  onClick={() => {
        router.push("/sw-dashboard/visibility");
      }}>
      Visibility
      <Chip
        variant="soft"
        size="sm"
        sx={{
          minHeight: 20,
          fontSize: "xs2",
          position: "absolute",
          top: 0,
          ml: 7,
        }}
      >
        {subType}
      </Chip>
    </ListItemButton>
  );
}

export default VisibilityLink;
