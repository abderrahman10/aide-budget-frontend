/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import logo from '@/assets/files.png'
import Image from 'next/image';
const AppFooter = () => {

    return (
        <div className="layout-footer">
            <Image src= {logo } alt="Logo" height="200" className="mr-2" />
            by
            <span className="font-medium ml-2">PrimeReact</span>
        </div>
    );
};

export default AppFooter;