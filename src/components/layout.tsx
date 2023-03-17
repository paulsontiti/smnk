import Navbar from "./home/navbar/navbar";


export default function Layout(props:{children:any}){

    return(
        <>
            <Navbar/>
            {props.children}
        </>
    )
}