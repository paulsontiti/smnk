import Image from "next/image";
import styles from '../../styles/home/testimonials.module.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardContent, CardHeader, IconButton } from "@material-ui/core";
import { useState } from "react";
import { Card, CardMedia } from "@mui/material";

export default function Testimonials(){
    const testimonies = [
       {
            name:'John Nwoke',
            pic:'/img/testimonials/test1.jfif',
            testimony:`It is a long established fact that a reader will be distracted by 
            the readable content of a page when looking at its layout. The point of using Lorem Ipsum
             is that it has a more-or-less normal distribution of letters, as opposed to using
             'Content here, content here', making it look like readable English. Many desktop publishing packages and web page`
       },
       {
        name:'Vera James Nwoke',
        pic:'/img/testimonials/test2.jfif',
        testimony:`It is a long established fact that a reader will be distracted by 
        the readable content of a page when looking at its layout. The point of using Lorem Ipsum
         is that it has a more-or-less normal distribution of letters, as opposed to using
         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page`
   },
   {
    name:'Salihu Mohammed',
    pic:'/img/testimonials/test3.jfif',
    testimony:`It is a long established fact that a reader will be distracted by 
    the readable content of a page when looking at its layout. The point of using Lorem Ipsum
     is that it has a more-or-less normal distribution of letters, as opposed to using
     'Content here, content here', making it look like readable English. Many desktop publishing packages and web page`
},
]

const [index,setIndex] = useState(0)

setInterval(()=>{
    const imgsLen = testimonies.length -1
    setIndex(index !== 0 ? index - 1 : imgsLen)
},5000)

    return(
        <>
            <div className={styles.container}>
              
                <div className={styles.wrapper} style={{
                    transform:`translateX(${-30*index}vw)`
                }}>
                        {testimonies.map((test,i)=>{
                            return(
                                <div className={styles.cardContainer} key={i}>
                                    <Card>
                                        <CardHeader title={test.name}/>
                                        <CardContent>
                                        <Image src={test.pic} alt={test.name} width={100} height={100}/>
                                        <p>{test.testimony}</p></CardContent>
                                    </Card>
                            </div>
                            )
                        })}
                    
                    
                </div>
            </div>
        </>
    )
}