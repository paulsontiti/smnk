
import WarningAlert from "@/components/alerts/WarningAlert";

function GenericContent({message}:{message:string}) {
  

  return (
     <WarningAlert message={message}/>
  );
}

export default GenericContent;
