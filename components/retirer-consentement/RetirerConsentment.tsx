"use client";
import React, { useRef, useState } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/navigation";

export default function RetirerConsentment({ slug }: { slug: string }) {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const token = slug;
  
  const redirect=()=>{
    router.push('/404');
  }

  const RetirerConsentement = async () => {
    console.log("rrrrrrrrrrrr");
    try {
      const url = `http://localhost:8081/api/v1/participants/retirer-consentement/${token}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Ajoutez d'autres en-têtes si nécessaire
        },
      });

      const responseData = await response.text(); // Get response text
      console.log("Response text:", responseData); // Log response text

      if (response.ok) {
        const data = JSON.parse(responseData); // Parse response text
        console.log(data);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Consentement retiré avec succès",
          life: 3000,
        });
      } else {
        const errorData = JSON.parse(responseData); // Parse response text
        throw new Error(
          errorData.message || "Erreur lors du retrait du consentement"
        );
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
  const accept = async () => {
    RetirerConsentement();
    setVisible(true);
    
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message:  "Vous ne souhaitez plus Bénéficier d'un accompagnement aide budget ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };
  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => {
            setVisible(false) 
            redirect()
        }}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />

      <ConfirmDialog
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
      <div>
        <div className="card flex flex-wrap justify-content-center ">
          <Panel header="Vous souhaiter retirer votre consentement ? ">
            <p className="m-0">
              Pour retirer votre consentement et renoncer à un accompagnement
              par un point conseil budget. cliquer sur le button ce-dessous.
            </p>
            <br />
            <p className="m-0">
              Attention, en retirant votre consentement, vous ne pourrez plus
              étre accompagné par les Points conseil budget.cette action est
              définitive et vos données seront supprimées.
            </p>
            <br />
            <div className="card flex flex-wrap justify-content-center">
              <Button
                label="Retirer mon consentement"
                severity="danger"
                icon="pi pi-exclamation-triangle"
                onClick={confirm1}
              />
            </div>
          </Panel>
          <div className="card flex justify-content-center">
            <Dialog
              header="Confirmation de commande "
              visible={visible}
              footer={footerContent}
              style={{ width: "50vw" }}
              onHide={() => setVisible(false)}
              modal
            >
              <p className="m-0">
                <strong>
                  Nous Avons bien pris en compte votre retrait de consentement .
                  <br /><br />
                </strong>
              </p>
              <p className="m-0">
                Un email de confirmation vient de vous étre envoyé .<br />
              </p>
              <p className="m-0">A bientot !</p>
            </Dialog>
          </div>

          <p>
            {" "}
            <strong>Pour tout question : </strong> vous pouvez nous écrire à{" "}
            <a href="email@email.com">dc-dn-panel@edf.fr</a>
          </p>
        </div>
      </div>
    </>
  );
}
