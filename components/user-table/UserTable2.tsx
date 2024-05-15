"use client";
import classes from "./UserTable.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

export default function UserTable2({ slug }: { slug: string }) {
  const [userData, setUserData] = useState([]);
  const token = slug;

  useEffect(() => {
    getUserByToken();
    //eslint-disable-next-line
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  async function getUserByToken() {
    try {
      const response = await fetch(
         `http://localhost:8081/api/v1/participants/find/${token}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des fichiers");
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }
  return (
    <div className={classes.tableElement}>
      <div className="card">
        <DataTable
          value={[userData]}
          emptyMessage="Aucun fichier trouvé"
          // showGridlines
        >
          <Column field="nom" header="Nom" style={{ width: "20%" }} />
          <Column field="prenom" header="Prénom" style={{ width: "20%" }} />
          <Column field="email" header="Email" style={{ width: "20%" }} />
          <Column  field="telephone" header="Téléphone"    style={{ width: "20%" }} />
          <Column field="civilite" header="civilite" style={{ width: "20%" }} />
        </DataTable>
      </div>
    </div>
  );
}
