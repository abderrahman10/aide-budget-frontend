"use client";
import React, { FormEvent, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import InputOtpCode from "../otp-verification/InputOtpCode";

export default function OtpDialog({ slug }: { slug: string }) {
  const toast = useRef<Toast>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const token = slug;

  const SendEmailWithOtpCodeHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = `http://localhost:8081/api/v1/participants/email/sendEmailWithOtp/${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });

      if (response.ok) {
        console.log(response);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Mail avec le code a été  envoyé avec succès",
          life: 3000,
        });
      } else {
        throw new Error("erreur lors de l'envoie de email avec le code ");
      }
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
   
       
     
   <div>
      <div className="card flex justify-content-center">
         <form onSubmit={SendEmailWithOtpCodeHandler}>
        <Button
          label="signer le pdf "
          icon="pi pi-external-link"
          onClick={() => {
            setVisible(true);
          }}
        /> </form>
        <Toast ref={toast} />

        <Dialog
          visible={visible}
          modal
          style={{ width: "50rem" }}
          onHide={() => setVisible(false)}
        >
          <InputOtpCode slug={token} />

        </Dialog>
      </div>
    </div> 
   
  );
}
