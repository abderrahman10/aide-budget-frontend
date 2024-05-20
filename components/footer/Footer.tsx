'use client';
import React from "react";
import Image from "next/image";
import logo from "@/assets/images_logo_light.jpg";
import style from "./Footer.module.css"
import { usePathname } from "next/navigation"


export default function FootBar() {
    const path = usePathname()

    if (path === '/login') {
     return null;
    }
  return (
    <div className={style.footer}>
      <div className={style.content}>
        <Image alt="logo" src={logo} height="40" className={style.logo} />
        <div>

       
        <p  className={style.leftAligned}>
          Conformément à la réglementation en matière de données personnelles,
          vous disposez d'un droit d'accès, de rectification, d'opposition,
          d'effacement, de limitation et de portabilité de vos données à l'adresse
          électronique dc-dn-panel@edf.fr, en justifiant de votre identité ou en
          vous authentifiant. Pour une information plus détaillée sur le traitement
          de vos données et de vos droits, nous vous invitons à consulter notre
          charte de protection des données personnelles disponible ici. Pour choisir
          vos préférences de communication ou vous désabonner, cliquez ici.
        </p> 
        </div>
        <p className={style.footerBottom}>
          Copyright 2024 EDF - Politique de cookies. Version 1.0.4
        </p>
      </div>
    </div>
  );
}