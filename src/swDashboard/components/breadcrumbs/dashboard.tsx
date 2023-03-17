import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  
}

export default function DashboardBreadcrumb() {
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