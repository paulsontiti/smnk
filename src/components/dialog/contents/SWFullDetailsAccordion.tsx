import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import SWServicesAccordion from "@/components/accordion/SWServicesAccordion";
import { getUserInfo } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import UserDetailsContent from "./UserDetailsContent";
import SWProfileAccordion from "@/components/accordion/SWProfileAccordion";


function SWFullDetailsAccordion({ userId }: { userId: string }) {
    const [sw,setSw] = useState<any>()
    
    useEffect(()=>{
           
        (async ()=>{
            const {data,error} =await getUserInfo(userId);
            setSw(data)
          })()
    },[userId])
  return (
   <>
   {sw && <SWProfileAccordion sw={sw}/>}
   {sw && sw.experience.length > 0 &&  <SWExpsAccordion exps={sw.experience}/>}
    {sw && sw.services.length > 0 && <SWServicesAccordion services={sw.services}/>}
   </>
  );
}

export default SWFullDetailsAccordion;
