"use client";
import { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FormEvent } from "react";
import { DownloadRelanceFile } from "../utils/DownloadRelanceFile";
const RelanceCsv = () => {
  const toast = useRef<Toast>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const generateCsvHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url =
        "http://localhost:8081/api/v1/admin/csv/download";
      await DownloadRelanceFile(url);
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

  return (
    <>
       <Toast ref={toast} />
      <div>
      <h4>Relance des Participants Non-Répondants</h4>
      <p>Pour relancer les participants qui n&apos;ont pas répondu à nos précédents emails, veuillez cliquer sur le bouton ci-dessous.</p>
        <form onSubmit={generateCsvHandler}>
          <Button label="Relancer" icon="pi pi-sync" />
        </form>
      </div>
    </>
  );
};

export default RelanceCsv;
