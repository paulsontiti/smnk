import Image from "next/image";
import styles from '../../styles/home/advertslider.module.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
<<<<<<< HEAD
=======

>>>>>>> 83ad3a1a9ec41e15f2a309a8ea22d20bcaa95fad
import { useState } from "react";

export default function AdvertSlider(){
    const imgs = [
        '/img/ads/ad1.png',
        '/img/ads/ad2.png',
        '/img/ads/ad3.png',
        '/img/ads/ad4.png',
        '/img/ads/ad5.png',
        '/img/ads/ad6.png',
]

const [index,setIndex] = useState(0)

setInterval(()=>{
    
        const imgsLen = imgs.length -1
        setIndex(index !== 0 ? index - 1 : imgsLen)
},5000)

    return(
        <>
            <div className={styles.container}>
                <div className={styles.wrapper} style={{
                    transform:`translateX(${-100*index}vw)`
                }}>
                        {imgs.map((img,i)=>{
                            return(
                                <div className={styles.imgContainer} key={i}>
                            <Image  alt="arrow1" src={img} fill={true} style={{objectFit:"contain"}}/>
                            </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}
