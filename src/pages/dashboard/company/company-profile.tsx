import {
  Box,
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
  CardHeader,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getCompanyProfile } from "@/lib/utils/user";
import useSWR from "swr";
import { useRouter } from "next/router";
import ErrorAlert from "@/components/alerts/Error";
import LoadingAlert from "@/components/alerts/Loading";
import EditBottomNavigation from "@/components/bottomNavigation/EditBottomNavigation";

export default function CompanyProfile() {
  const router = useRouter();
  const { _id } = useSelector((state: RootState) => state.users.user);
  const { data, error } = useSWR("getProfile", getCompanyProfile(_id));

  if (error) return <ErrorAlert />;
  if (!data) return <LoadingAlert />;

  return (
    <Box  sx={{maxWidth:'100%',p:{xs:'1rem',sm:'3rem 5rem',md:'3rem 10rem',lg:'3rem 20rem',xl:'3rem 20rem'}}}>
        <CardHeader title={`Company's Profile`}/>
    
        <Grid container spacing={1}>
        <Grid item xs={6} sm={6}>
          <Typography variant="subtitle2">{`Company's Name:`} </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="body2">{data.name}</Typography>
          </Grid>
        
        
          <Grid item xs={6} sm={6}>
          <Typography variant="subtitle2">State:</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="body2">{data.state}</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="subtitle2">LGA:</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="body2">{data.lga}</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="subtitle2">Office Address:</Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="body2">{data.officeAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Bio:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Typography variant="body2">{data.description}</Typography>
          </Grid>
        </Grid>
      
    
      <CardActions>
        <EditBottomNavigation label="Edit Profile" handleClick={()=>{router.push("/dashboard/company/edit-company-profile")}}/>
   
      </CardActions>
    </Box>
  );
}
