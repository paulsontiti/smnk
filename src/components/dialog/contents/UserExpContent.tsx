
import SWExpsAccordion from "@/components/accordion/SWExpsAccordion";
import {getUserExp } from "@/lib/utils/user";
import React, { useEffect, useState } from "react";

function UserExpContent({ userId }: { userId: string }) {
  const [exps, setExps] = useState<any[]>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    
      (async ()=>{
        const {data,error} =await getUserExp(userId);
        setExps(data)
        setError(error)
      })()
  }, [userId]);
  if (error) return <p>An Error Occurred</p>;
  if (!exps) return <p>loading....</p>;
  
  return <>
  {
    <SWExpsAccordion exps={exps}/>
  }
  </>
}

export default UserExpContent;
