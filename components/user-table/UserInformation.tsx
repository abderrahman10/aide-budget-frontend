"use client";
import React, { useEffect, useState } from "react";
import classes from "./UserInformation.module.css";



interface UserData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  civilite: string;
}


export default function UserInformations({ slug }: { slug: string }) {
  const [userData, setUserData] = useState<UserData | null>(null);  // Changez [] à null pour une initialisation appropriée

  const token = slug;

  useEffect(() => {
    async function getUserByToken() {
      try {
        const response = await fetch(
          `http://localhost:8081/api/v1/participants/find/${token}`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des fichiers");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    }

    getUserByToken();
  }, [token]);

  return (
    <div>
      {userData ? (
        <div className={classes.tableElement}>
          <table className={classes.tableStriped}>
            <thead>
              <tr>
                <th colSpan={2}>Vos informations personnelles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={classes.td1}>
                  <b>Nom: </b>
                </td>
                <td className={classes.td2}>{userData.nom}</td>
              </tr>
              <tr>
                <td className={classes.td1}>
                  <b>Prénom: </b>
                </td>
                <td className={classes.td2}>{userData.prenom}</td>
              </tr>
              <tr>
                <td className={classes.td1}>
                  <b>Email: </b>
                </td>
                <td className={classes.td2}>{userData.email}</td>
              </tr>
              <tr>
                <td className={classes.td1}>
                  <b>Téléphone: </b>
                </td>
                <td className={classes.td2}>{userData.telephone}</td>
              </tr>
              <tr>
                <td className={classes.td1}>
                  <b>Civilité: </b>
                </td>
                <td className={classes.td2}>{userData.civilite}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
