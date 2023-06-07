
import useSWR from 'swr'
import { getAllAds } from '@/lib/admin'
import AdsDetailsTable from './AdsDetailsTable'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import ErrorAlert from '@/components/alerts/Error'
import LoadingAlert from '@/components/alerts/Loading'
import InfoAlert from '@/components/alerts/Info'
import AddBottomNavigation from '@/components/bottomNavigation/AddBottomNavigation'


export default function Ads(){
const router = useRouter()
    const {data,error} = useSWR('getAds',getAllAds())

    if(error) return <ErrorAlert message='An error occurred,please try again or contact admin'/>
    if(!data) return <LoadingAlert/>
    if(data.length < 1) return <Box m={'1rem'}>
        <InfoAlert message='No Ads Available.Please create one'/>
        <AddBottomNavigation label='Create Ad' handleClick={()=>{
            router.push('/a-dashboard/ads/create')
        }}/>
        </Box>

    return(
       <>
      <AddBottomNavigation label='Create Ad' handleClick={()=>{
            router.push('/a-dashboard/ads/create')
        }}/>
      <AdsDetailsTable ads={data}/>
       </>
        
    )
}