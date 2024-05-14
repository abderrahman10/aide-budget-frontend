"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";


const CreateParticipantForm = () => {
  const toast = useRef<Toast>(null);
  const [departements, setDepartements] = useState([]);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchDepartements();
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
      const response = await fetch("http://localhost:8081/api/v1/participants/admin/getAllDepartements");
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
      const url = "http://localhost:8081/api/v1/participants/admin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
        label="Enregistrer"
        icon="pi pi-pencil"
        onClick={() => setVisible(true)}
      />
      <Toast ref={toast} />
      <Dialog
        header="ajouter un participant"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="col-12">
            <div className="card">
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-4">
                  <label htmlFor="nom">Nom</label>
                  <InputText
                    id="nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.nom && (
                    <small className="p-error">Nom est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="prenom">prenom</label>
                  <InputText
                    id="prenom"
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.prenom && (
                    <small className="p-error">prenom est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="telephone">telephone</label>
                  <InputText
                    id="telephone"
                    type="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.telephone && (
                    <small className="p-error">telephone est requis</small>
                  )}
                </div>

                <div className="field col-12 md:col-6">
                  <label htmlFor="email">Email</label>
                  <InputText
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.email && (
                    <small className="p-error">email est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-6">
                  <label htmlFor="departement">departement</label>
                  <Dropdown
                    id="departement"
                    value={selectedDepartement}
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
                  <label htmlFor="bp">BP</label>
                  <InputText
                    id="bp"
                    type="text"
                    name="bp"
                    value={formData.bp}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.bp && (
                    <small className="p-error">bp est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="pcb">PCB</label>
                  <InputText
                    id="pcb"
                    type="text"
                    name="pcb"
                    value={formData.pcb}
                    onChange={handleInputChange}
                  />
                  {formSubmitted && !formData.pcb && (
                    <small className="p-error">pcb est requis</small>
                  )}
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="civilite">Civilité</label>
                  <InputText
                    id="civilite"
                    type="text"
                    name="civilite"
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
