import { Divider } from "@mui/material";
import { Grid,Typography } from "@mui/material";


function UserIndividualProfileDetails({ profile }: { profile:any }) {

  if (!profile) return <p></p>;

  return <>
    <Grid container>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>First Name:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.firstName}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>Last Name:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.lastName}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>User Name:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.userName}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>State:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.state}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>LGA:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.lga}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>Address:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.address}</Typography>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='subtitle1'>Bio:</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption" sx={{textTransform:'capitalize'}}>{profile.description}</Typography>
            <Divider/>
        </Grid>
    </Grid>
  </>
}

export default UserIndividualProfileDetails;
