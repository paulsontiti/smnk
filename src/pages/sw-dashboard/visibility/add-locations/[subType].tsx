import Layout from "@/components/dashboard/layout";
import SnackbarComponent from "@/components/snackbar/SnackBar";
import { SmnkErrorBoundary } from "@/pages/_app";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { AlertColor, Box, Button } from "@mui/material";
import { states } from "@/lib/form";
import MultipleAutoComplete from "@/components/form/MultipleAutoComplete";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AddLocation() {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const router = useRouter();
  const subType = router.query.subType as string;
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState<AlertColor>("error");
  const [locations, setLocations] = useState<any[]>([]);

  //declare refs
  const snackBarRef = useRef();

  const label = () => {
    switch (true) {
      case subType === "Gold": {
        return "Select your preferred extra three states";
      }
      case subType === "Silver": {
        return "Select your preferred extra two states";
      }
      default: {
        return "Select your preferred extra state";
      }
    }
  };
  const placeholder = () => {
    switch (true) {
      case subType === "Gold": {
        return "Select only three states";
      }
      case subType === "Silver": {
        return "Select only two states";
      }
      default: {
        return "Select only one state";
      }
    }
  };

  const validLocations = () => {
    switch (true) {
      case subType === "Gold": {
        return locations.length <= 3 && locations.length > 0;
      }
      case subType === "Silver": {
        return locations.length <= 2 && locations.length > 0;
      }
      case subType === "Bronze": {
        return (locations.length = 1);
      }
      default: {
        return false;
      }
    }
  };
  const addLocations = async () => {
    if (validLocations()) {
      const locs = locations.map((l) => l.label);
      try {
        const res = await axios({
          method: "POST",
          url: `${process.env.SMNK_URL}api/sw/add-locations`,
          data: { locations: locs, userId: _id },
        });
        const data = res.data;
        if (data) {
          setMsg("Your preferred locations were successfully added");
          setColor("success");
          const refState = snackBarRef.current as any;
          refState.handleClick();
          setTimeout(() => {
            router.back();
          }, 3000);
        } else {
          setMsg("Error occurred, try again");
          setColor("error");
          const refState = snackBarRef.current as any;
          refState.handleClick();
        }
      } catch (err: any) {
        console.log(err);
      }
    } else {
      setMsg(placeholder);
      setColor("error");
      const refState = snackBarRef.current as any;
      refState.handleClick();
    }
  };
  return (
    <Layout>
      <Box mt={10}>
        <SmnkErrorBoundary>
          <SnackbarComponent msg={msg} color={color} ref={snackBarRef} />
          <MultipleAutoComplete
            options={states}
            label={label()}
            placeholder={placeholder()}
            onChange={(event: any, newValue: any) => {
              setLocations(newValue);
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={addLocations}
            disabled={locations.length === 0 || locations.length > 3}
          >
            Add Locations
          </Button>
        </SmnkErrorBoundary>
      </Box>
    </Layout>
  );
}
