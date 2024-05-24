'use client';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import logo from "@/assets/images_logo_light.jpg";
import Image from 'next/image';
import { usePathname } from "next/navigation"

export default function UserNavbar () {
    const path = usePathname()

    if (path === '/login') {
     return null;
    }
    const items: MenuItem[] = [
        // {
        //     label: 'Home',
        //     icon: 'pi pi-home'
        // },
        // {
        //     label: 'Features',
        //     icon: 'pi pi-star'
        // },
        // {
        //     label: 'Projects',
        //     icon: 'pi pi-search',
          
        // },
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
     
        // },
      
    ];

    const start = <Image alt="logo" src={logo} height="40" className="mr-2"></Image>;


    return (
        <div className="card">
            <Menubar model={items} start={start}  />
        </div>
    )
}