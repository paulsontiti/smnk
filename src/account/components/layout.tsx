import Image from 'next/image'
import styles from '../../styles/account/layout.module.css'

export default function AccountLayout(props:{children:any}){

    return (
        <div id="container" className={styles.container}>
           <div className={styles.wrapper}>
           <div>
            <Image src="/assets/ad2.png" alt='layout image' width={400} height={600}/>
           </div>
                
            <div>
                {props.children}
            </div>
           </div>
        </div>  
    )
}