import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { AppProps } from "next/app";
import Footer from "./footer";
import Header from "./header";

export default function Layout(props:{children: any}){

    return(
<>
<Header/>
        { props.children }
        <Footer/>
        <CssBaseline/>
</>
    )
}