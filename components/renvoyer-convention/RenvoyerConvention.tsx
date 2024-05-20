"use client";
import React, { useRef, useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";

export default function RenvoyerConvention({ slug }: { slug: string }) {
  const token = slug;
  const toast = useRef<Toast>(null);
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);





  const sendContract = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/participants/email/sendContract/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Si la réponse est OK, afficher un message de succès
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Mail avec votre contrat signé a été envoyer avec succés",
          life: 3000,
        });
      } else {
        // Si la réponse n'est pas OK, extraire le message d'erreur du backend
        const errorMessage = await response.text();
        setError(errorMessage);
        // Afficher le message d'erreur
        toast.current?.show({
          severity: "warn",
          summary: "Warning",
          detail: errorMessage || "Something went wrong",
          life: 3000,
        });
      }
    } catch (error) {
      // Gérer les erreurs de requête
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong:",
        life: 3000,
      });
    }
  };

  const footerContent = (
    <div>
        <Button label="Ok" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
);
  return (
    <div className="">
      <Toast ref={toast} />
      <div className="card flex justify-content-center">
        <Dialog
          header="Confirmation de commande "
          visible={visible}
          footer={footerContent}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">
            Nous Avons bien pris en compte votre demande .<br /> vous aller recevoir à
            nouveau un e-mail avec vontre convetion signée.
          </p>
        </Dialog>
      </div>

      <Panel header="Vous avez déja donné votre formulaire de consentement ! ">
        <div className="card flex flex-wrap justify-content-center">
          <Button
            label="Envoyer de nouveau ma convention par e-mail"
            icon="pi pi-envelope"
            onClick={() => {
                sendContract();
                 setVisible(true);
            }}
          />
        </div>
      </Panel>
    </div>
  );
}
