import { useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FormEvent } from "react";

export default function PdfSigner ({  slug }: {  slug: string}) {

  const toast = useRef<Toast>(null);
  const token = slug;

  const PdfSignerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8081/api/v1/participants/email/sendEmailWithAttachment/${token}`;
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Email sent successfully",
          life: 3000,
        });
      } else {
        throw new Error("Failed to send email");
      }
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
      <form onSubmit={PdfSignerHandler}>
        <Toast ref={toast} />
        <Button type="submit" label="Signer" />
      </form>
    </>
  );
};

