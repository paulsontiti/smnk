import { NextRouter } from "next/router";
import EditExperienceForm from "./editExperienceForm";



export default function EditExperience({router,expId}:{router:NextRouter,expId:string}){
  
   
    return(
            <EditExperienceForm router={router} expId={expId}/>
        
    )
}