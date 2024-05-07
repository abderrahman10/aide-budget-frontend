"use client";
import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/files.png";
import logo2 from "@/assets/logo.png";
import { Button } from "primereact/button";
import Link from "next/link";
import "primeicons/primeicons.css";
import UserTable from "@/components/user-table/UserTable";

import React, {useEffect, useState } from "react";

export default function UserInformation({  params,}: {  params: { slug: string };}) {
  const [userData, setUserData] = useState<any>(null);

  const { slug } = params;
  
  useEffect(() => {
    
    getUserByToken();
    //eslint-disable-next-line
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getUserByToken() {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/participants/find/${slug}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du participant");
      }

      const data = await response.json();
      // Faire quelque chose avec les données récupérées, par exemple, mettre à jour l'état du composant avec les données du participant
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.column1}>
        <div className={classes.columnContent}>
          <h2>Vos informations personnelles</h2>
          <Image
            src={logo}
            alt="Files"
            width={100}
            height={100}
            className={classes.fileImg}
          />
        </div>
      </div>
      <div className={classes.column2}>
        <Image
          src={logo2}
          alt="Logo"
          width={100}
          height={100}
          className={classes.logo}
        />
        <div className={classes.secondColumnInfo}>
          {userData && <UserTable userData={userData} /> }
        

          <div className={classes.importSection}>
            <h2>
              Pour bénéficier  d&apos;un accompagnement aide budget, rien de plus
              simple, il vous suffit de donner votre accord en cliquant sur le
              bouton ci-dessous : 
            </h2>

            <div className="card flex flex-wrap justify-content-center gap-2">
              <Link href={`/user-consentement/${slug}`}>
                <Button label="Donner Mon accord" type="submit" />
              </Link>
            </div>
            <p>
              <strong>Aide-Budget, c&apos; est quoi ?</strong> Le gouvernement a lancé
              le 27 février 2023 une nouvelle initiative nommée Aide-Budget qui
              associe, dans une démarche commune de prévention du
              surendettement, pouvoirs publics, fournisseurs d&apos; énergie,
              fédérations de bailleurs sociaux et le réseau des Points Conseil
              Budget. Cette expérimentation, menée durant douze mois sur onze
              départements en métropole et en Outre-mer, a pour objectif de
              repérer en amont les signaux de surendettement des ménages afin de
              leur proposer un accompagnement personnalisé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
