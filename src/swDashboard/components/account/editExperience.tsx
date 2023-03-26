import { NextRouter } from "next/router";
import EditExperienceForm from "./editExperienceForm";
import Layout from "../../../components/dashboard/layout";

import axios from "axios";
import useSWR from 'swr'

export default function EditExperience({router,expId}:{router:NextRouter,expId:string}){
  
    const {data,error} = useSWR('getExp',async ()=>{
                try{
                        const res = await axios({
                                method:'POST',
                                url:`${process.env.SMNK_URL}api/sw-dashboard/edit-experience/${expId}`
                            })
                        const data = await res.data
                        return data
                
                }catch(err:any){
                    console.log(err)
                    return
                }
            })

if(error) return <p>Error</p>
if(!data) return <p>Loading.....</p>

    return(
        <Layout>
            <EditExperienceForm router={router} initialValues={data}/>
        </Layout>
        
    )
}