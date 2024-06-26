"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DownloadExportFile } from "../utils/DownlaodExportFile";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { parseCookies } from 'nookies';

export default function HistoriqueFilesTable() {

  const cookies = parseCookies();
  const JSSESSION = cookies.JSESSIONID;
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const [filesData, setFilesData] = useState([]);
  const toast = useRef<Toast>(null);
  useEffect(() => {
    getAllFilesWithDate();
     //eslint-disable-next-line
  }, []);

  const generateExportFile = async (id: number,fileName: string) => {
    try {
      const url = `http://localhost:8081/api/v1/admin/file/downloadImageFromFileSystem?id=${id}`;
      await DownloadExportFile(url, id.toString(), fileName);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Le fichier CSV a été téléchargé avec succès",
        life: 3000,
      });
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.message || "Something went wrong",
        life: 3000,
      });
    }
  };

  async function getAllFilesWithDate() {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/admin/file/getFileNames`,
        {
          method: "GET",
          headers: {
            Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
          },
          credentials: "include",
        });
     

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des fichiers");
      }

      const data = await response.json();
      console.log(data);
      setFilesData(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  return (
    <div className="card">
      <Toast ref={toast} />

      <DataTable
        value={filesData}
        paginator
        first={first}
        rows={rows}
        totalRecords={120}
        rowsPerPageOptions={[10, 20, 30]}
        emptyMessage="Aucun fichier trouvé"
        // showGridlines
      >
        <Column
          field="fileName"
          header="Nom Fichier"
          style={{ width: "40%" }}
        />
        <Column
          field="exportDate"
          header="Date d'exportation"
          style={{ width: "40%" }}
        />

        <Column
          header="Télécharger"
          body={(rowData) => (
            <Button
              label="Télécharger"
              icon="pi pi-download"
              onClick={() => generateExportFile(Number(rowData.id),rowData.fileName)}
            />
          )}
          style={{ width: "20%" }}
        />
      </DataTable>
    </div>
  );
}