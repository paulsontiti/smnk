import HomeLogoutAppBar from "./appBar/HomeLogoutAppBar";
import Footer from "./footer/Footer";


export default function Layout(props:{children:any}){

    return(
        <>
<HomeLogoutAppBar/>
            {props.children}
            <Footer/>
        </>
    )
}