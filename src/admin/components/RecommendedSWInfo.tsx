import { Job, getRecommendedSkilledWorkersInfo } from '@/lib/types/job'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import useSWR from 'swr'

const SWInfo = (info:any)=>{
    return(
        <>
            <h4>Profile</h4>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>First Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{info.info.firstName}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}
const SWService = (serv:any)=>{
    
    return(
        <>
            <h4 >Services</h4>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>Title:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{serv.serv.title}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </>
    )
}

function RecommendedSWInfo({job}:{job:Job}) {
    const {data,error} = useSWR('getswinfo',getRecommendedSkilledWorkersInfo(job._id))
    if(error) return <p>Error occurred</p>
    if(!data) return <p>loading....</p>
    
    return (
        <>
            <SWInfo info={data.info}/>
            <SWService serv={data.serv}/>
        </>
    )

}

export default RecommendedSWInfo