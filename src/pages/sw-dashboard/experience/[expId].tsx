import EditExperience from "@/swDashboard/components/account/editExperience";
import { useRouter } from "next/router";

export default function ExpId(){
const router = useRouter()

const {expId} = router.query
const id = expId as string
    return(
        <EditExperience router={router} expId={id}/>
    )
}