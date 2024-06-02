"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import { parseCookies } from 'nookies';


const CreateParticipantForm = () => {
  const cookies = parseCookies();
  const JSSESSION = cookies.JSESSIONID;
  const toast = useRef<Toast>(null);
  const [departements, setDepartements] = useState([]);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchDepartements();
     //eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    departement: "",
    bp: "",
    pcb: "",
    civilite: "",
  });

  const fetchDepartements = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/admin/getAllDepartements",
      {
        method: "GET",
        headers: {
          Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des départements");
      }
      const data = await response.json();
      console.log(data);
      setDepartements(data);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la récupération des départements");
    }
  };

  const handleDropdownChange = (e: any) => {
    setSelectedDepartement(e.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      departement: e.value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const formIsValid = Object.values(formData).every((value) => value !== "");

    if (!formIsValid) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Veuillez remplir tous les champs obligatoires",
        life: 3000,
      });
      return;
    }
    try {
      const url = "http://localhost:8081/api/v1/admin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    console.log("thisi si value of session",  JSSESSION?.valueOf)
    
      if (!response.ok) {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        throw new Error(errorMessage);
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Les données ont été enregistrées avec succès",
        life: 3000,
      });
      setVisible(false);
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
    <div className="card flex justify-content-center">
      <Button
        label="Ajouter un Participant"
        icon="pi pi-pencil"
        onClick={() => setVisible(true)}
      />
      <Toast ref={toast} />
      <Dialog
        header="Ajouter un participant"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="col-12">
            <div className="card">
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-4">
                  <InputText
                    id="nom"
                    type="text"
                    name="nom"
                    placeholder="Nom" 
                    value={formData.nom}
                    onChange={handleInputChange}
                    tooltip="Entrer votre nom"
                    tooltipOptions={{ event: 'both' ,position: 'top'}}
                  />
                  {formSubmitted && !formData.nom && (
                    <small className="p-error">Nom est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
               
                  <InputText
                    id="prenom"
                    type="text"
                    name="prenom"
                    placeholder="Prénom" 
                    value={formData.prenom}
                    onChange={handleInputChange}
                    tooltip="Entrer votre Prénom"
                    tooltipOptions={{ event: 'both' ,position: 'top'}}
                  />
                  {formSubmitted && !formData.prenom && (
                    <small className="p-error">prenom est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <InputText
                    id="telephone"
                    type="telephone"
                    name="telephone"
                    placeholder="Téléphone" 
                    value={formData.telephone}
                    onChange={handleInputChange}
                    tooltip="Entrer votre telephone"
                    tooltipOptions={{ event: 'both' ,position: 'top'}}
                  />
                  {formSubmitted && !formData.telephone && (
                    <small className="p-error">telephone est requis</small>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <InputText
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email" 
                    tooltip="Entrer votre Email"
                    tooltipOptions={{ event: 'both' ,position: 'left'}}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.email && (
                    <small className="p-error">email est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <Dropdown
                    id="departement"
                  
                    value={selectedDepartement}
                    tooltip="selectionné votre  département"
                    tooltipOptions={{ event: 'both' ,position: 'right'}}
                    options={departements.map((departement) => ({
                      label: departement,
                      value: departement,
                    }))}
                    onChange={handleDropdownChange}
                    placeholder="Sélectionner un département"
                  />
                  {formSubmitted && selectedDepartement === null && (
                    <small className="p-error">Département requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <InputText
                    id="bp"
                    type="text"
                    name="bp"
                    placeholder="Bp"
                    tooltip="Entré votre Bp"
                    tooltipOptions={{ event: 'both' ,position: 'bottom'}}
                    value={formData.bp}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.bp && (
                    <small className="p-error">bp est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <InputText
                    id="pcb"
                    type="text"
                    name="pcb"
                    placeholder="Pcb"
                    tooltip="Entré votre Pcb"
                    tooltipOptions={{ event: 'both' ,position: 'bottom'}}
                    value={formData.pcb}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.pcb && (
                    <small className="p-error">pcb est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <InputText
                    id="civilite"
                    type="text"
                    name="civilite"
                    placeholder="civilite"
                    tooltip="Civilité"
                    tooltipOptions={{ event: 'both' ,position: 'bottom'}}
                    value={formData.civilite}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.civilite && (
                    <small className="p-error">civilite est requis</small>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card flex justify-content-center">
            <Button type="submit" label="Enregistrer" />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateParticipantForm;
