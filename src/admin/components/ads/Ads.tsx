
import useSWR from 'swr'
import { getAllAds } from '@/lib/admin'
import AdsDetailsTable from './AdsDetailsTable'
import AddFloatingActionButtons from '@/components/fab/Add'
import { useRouter } from 'next/router'


export default function Ads(){
const router = useRouter()
    const {data,error} = useSWR('getAds',getAllAds())

    if(error) return <p>An Error occurred</p>
    if(!data) return <p>loading.....</p>
    if(data.length < 1) return <p>No Ads Available.</p>

    return(
       <>
       <AddFloatingActionButtons handleClick={()=>{
        router.push('/a-dashboard/ads/create')
       }}/>
      <AdsDetailsTable ads={data}/>
       </>
        
    )
}