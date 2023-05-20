
import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import SWServicesAccordion from "@/components/accordion/SWServicesAccordion";
import {getUserServices } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserServicesContent({ userId }: { userId: string }) {
  const [services, setServices] = useState<any[]>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    
      (async ()=>{
        const {data,error} =await getUserServices(userId);
        setServices(data)
        setError(error)
      })()
  }, [userId]);
  if (error) return <p>An Error Occurred</p>;
  if (!services) return <p>loading....</p>;
  
  return <>
  {
    <SWServicesAccordion services={services}/>
  }
  </>
}

export default UserServicesContent;
