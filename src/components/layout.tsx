import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
import Navbar from "./home/navbar/navbar";


export default function Layout(props:{children:any}){

    return(
        <>
<HomeLogoutAppBar/>
            {props.children}
        </>
    )
}