'use client'
import { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FormEvent } from "react";
import { downloadFile } from "../utils/DownloadFile";


const RelanceCsv = () => {
  const toast = useRef<Toast>(null);

  const generateCsvHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = "http://localhost:8081/api/v1/participants/admin/csv/download";
      await downloadFile(url);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "File Csv downloaded successfully",
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
  };

  return (
    <>
      <form onSubmit={generateCsvHandler}>
        <Toast ref={toast} />
        <Button label="Relancer" />
      </form>
    </>
  );
};

export default RelanceCsv;
