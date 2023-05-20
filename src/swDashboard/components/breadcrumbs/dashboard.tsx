import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  
}

export default function DashboardBreadcrumb() {
  const router = useRouter()
    //console.log(router)
  return (
    <div onClick={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'flex-start',marginLeft:'.5rem'}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          Home
        </Link>
        <Link
          
          href="/material-ui/getting-started/installation/"
        >
          Dashboard
        </Link>
      
      </Breadcrumbs>
    </div>
  );
}