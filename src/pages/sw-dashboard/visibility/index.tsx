import { CardContent } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { Bronze } from '../../../swDashboard/components/visibility/bronze'
import { Gold } from '@/swDashboard/components/visibility/gold'
import { Platinium } from '@/swDashboard/components/visibility/platinium'
import Layout from '@/components/dashboard/layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function VisibilityPage() {

  const {_id} = useSelector((state:RootState)=>state.users.user)
  const [packageName,setPackageName] = useState('')

  useEffect(()=>{
    (
      async ()=>{
          try{
            const res = await axios({
                  method:'POST',
                  url:`${process.env.SMNK_URL}api/sw-dashboard/visibility/${_id}`
              })
            const data = await res.data
            if(data.confirm){
              setPackageName(data.packageName)
            }
            
        }catch(err:any){
          console.log(err)
          return err
        }
     
      }
    )()
  },[_id])
  return (
    <Layout>
        <h4>Upgrade Your Package</h4>
            <Platinium packageName={packageName}/>
            <Gold packageName={packageName}/>
            <Bronze packageName={packageName}/>
    </Layout>
    
  )
}
