import { useRouter } from "next/router";
import AddExperienceForm from "./addExperienceForm";
import Layout from "@/components/dashboard/layout";

export default function AddExperience(){
    const router = useRouter()
    
    return(

        <Layout>
            <AddExperienceForm router={router}/>
        </Layout>
    )
}