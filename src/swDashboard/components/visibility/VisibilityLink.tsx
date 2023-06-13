import { RootState } from "@/store";
import { Chip } from "@mui/joy";
import { ListItemText, ListItemButton, ListItemIcon,Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  if (subType === 'Free')
    return (
      <ListItemButton
        sx={{ ml: 1 }}
        onClick={() => {
          router.push("/sw-dashboard/visibility");
        }}
      > <ListItemIcon><VisibilityIcon sx={{color:"white"}}/></ListItemIcon>
      
        <ListItemText primary={<Typography variant="body2">Upgrade Subscription</Typography>} />
        <Chip
        color="success"
          variant="soft"
          size="sm"
          sx={{
            minHeight: 20,
            fontSize: "xs2",
            position: "absolute",
            top: -8,
            ml: 14,
          }}
        >
          Recommended
        </Chip>
      </ListItemButton>
    );
  return (
 
   
    <ListItemButton sx={{ ml: 1}}  onClick={() => {
        router.push("/sw-dashboard/visibility");
      }}><ListItemIcon><VisibilityIcon sx={{color:"white"}}/></ListItemIcon>
    <ListItemText primary={<Typography variant="body2">Subscription</Typography>} />
      <Chip
        variant="soft"
        size="sm"
        sx={{
          minHeight: 20,
          fontSize: "xs2",
          position: "absolute",
          top: 0,
          ml: 13,
        }}
      >
        {subType}
      </Chip>
    </ListItemButton>
  );
}

export default VisibilityLink;
