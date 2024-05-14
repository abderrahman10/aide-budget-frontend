"use client";
import React, { useEffect, useState } from "react";
import { UserOauth2Info } from "../user-oauth2-info/UserOauth2Info";
import classes from "./AdminInfo.module.css";
export default function AdminInfo({ email }: { email: string }) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getAdminByEmail();
    //eslint-disable-next-line
  }, []);

  async function getAdminByEmail() {
    try {
      const AdminEmail = email;
      const formData = new FormData();
      formData.append("email", AdminEmail);

      const response = await fetch(
        `http://localhost:8081/api/v1/participants/admin/findByEmail?email=${encodeURIComponent(
          AdminEmail
        )}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du participant");
      }

      const data = await response.json();
      // Mettre à jour l'état du composant avec les données récupérées
      setUserData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }
  return (
    <div>
      {/* Condition de rendu basée sur l'existence de userData */}

      {userData && (
        <>
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
                  <b>nom: </b>
                  </td>
                  <td className={classes.td2}>{userData.nom}</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
                    <b>prenom: </b>
                  </td>
                  <td className={classes.td2}>{userData.prenom}</td>
                </tr>
            
                <tr>
                  <td className={classes.td1}>
                    <b>NNI:</b>
                  </td>
                  <td className={classes.td2}>{userData.nni}</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
                    <b>Privilège administrateur: </b>
                  </td>
                  <td className={classes.td2}>{userData.departement}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </>
      )}
    </div>
  );
}
