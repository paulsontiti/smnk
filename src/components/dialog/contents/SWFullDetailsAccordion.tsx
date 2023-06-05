import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import SWServicesAccordion from "@/components/accordion/SWServicesAccordion";
import { getUserInfo } from "@/lib/utils/user";
import { useEffect, useState } from "react";
import SWProfileAccordion from "@/components/accordion/SWProfileAccordion";


function SWFullDetailsAccordion({ userId }: { userId: string }) {
    const [sw,setSw] = useState<any>()
    
    useEffect(()=>{
           
        (async ()=>{
            const {data} =await getUserInfo(userId);
            setSw(data)
          })()
    },[userId])
    if(!sw) return <p></p>
  return (
   <>
  <SWProfileAccordion sw={sw}/>
   {sw.experience.length > 0 &&  <SWExpsAccordion exps={sw.experience}/>}
    {sw.services.length > 0 && <SWServicesAccordion services={sw.services}/>}
   </>
  );
}

export default SWFullDetailsAccordion;
