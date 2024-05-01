"use client";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FormEvent } from "react";
import { FileUpload } from 'primereact/fileupload';
import classes from "./UploadFile.module.css";
import React from 'react'
import { parseCookies } from 'nookies';
import RelanceCsv from "../relance-csv/RelanceCsv";

 const UploadFile = () => {
  const cookies = parseCookies();
  const JSSESSION = cookies.JSESSIONID;
  const toast = useRef<Toast>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);;

  async function UploadFileForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (selectedFiles.length > 0) {
      // Ajouter les fichiers sélectionnés au formulaire
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/participants/admin/csv/upload",
          {
            method: "POST",
            body: formData,
            headers: {
              Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
            },
            credentials: "include",
          }
          
        );console.log("this is the data ",response)
        if (!response.ok) {
          const responseData = await response.json();
          const errorMessage = responseData.message;
          throw new Error(errorMessage);
        }

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Data parsed successfully",
          life: 3000,
        });
      } catch (error:any) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Something went wrong",
          life: 3000,
        });
      }
    } else {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select a file to upload",
        life: 3000,
      });
    }
  }
  return (
    <div className={classes.importSection}>
      <h2>Importer une nouvelle liste de participant</h2>
      <h4>Pour importer un fichier, cliquez sur le bouton ci-dessous :</h4>
      <form onSubmit={UploadFileForm}>
        <Toast ref={toast} />
        <div className="card flex flex-wrap justify-content-center">
          <FileUpload name="file" multiple onSelect={(e) => setSelectedFiles(e.files)} accept=".csv" emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
          
        </div>
        <div className={classes.submitButton}>
            <Button label="Importer" type="submit" />
            
         </div>   
        
      </form>
      
    </div>
  );
}
export default UploadFile;