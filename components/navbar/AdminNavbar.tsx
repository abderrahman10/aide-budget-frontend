'use client';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import logo from "@/assets/images_logo_light.jpg";
import Image from 'next/image'; 
import { useRouter } from 'next/navigation'
import { usePathname } from "next/navigation"
import Link from 'next/link';

export default function AdminNavbar ({ image }: { image: string }) {
    const path = usePathname()
    const router = useRouter();
    console.log("eeeeeeeeeeee"+image);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const items: MenuItem[] = [
         {
             label: 'Dashboard',
             icon: 'pi pi-chart-bar',
             command: () => handleNavigation('/')

          
         },
        {
            label: 'Gestion-Participant',
            icon: 'pi pi-user',
            command: () => handleNavigation('/consentements')

        },
        {
            label: 'Historique',
            icon: 'pi pi-history',
            command: () => handleNavigation('/historique')
        },

  
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
            command: () => handleNavigation('/login')

        }
    ];
    const start = (<Link href="/"><Image alt="logo" src={logo} height="40" className="mr-2" />  </Link>  );
        
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
            
            <Avatar image={image} shape="circle" />

        </div>
    );
    
    if (path === '/login') {
        return null;
       }
    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}