import { NextRouter } from "next/router";
import EditExperienceForm from "./editExperienceForm";



export default function EditExperience({router,index}:{router:NextRouter,index:number}){
  
   
    return(
            <EditExperienceForm router={router} index={index}/>
        
    )
}