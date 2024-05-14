import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import styles from "./InputOtpCode.module.css";
import { Toast } from "primereact/toast";

export default function InputOtpCode({ slug ,onClose}: { slug: string ,onClose: () => void }) {
  const toast = useRef<Toast>(null);

  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');

  const token = slug;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const inputId = parseInt(id.replace('input', ''));
    
    // Update the OTP state based on the input
    setOtp(prevOtp => {
      return prevOtp.slice(0, inputId - 1) + value + prevOtp.slice(inputId);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    try {
      const response = await fetch(`http://localhost:8081/api/v1/participants/email/verify/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp }),
      });

      if (response.ok) {
        // Si la réponse est OK, afficher un message de succès
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Mail avec votre contrat signé a été envoyer avec succés",
          life: 3000,
          
        });
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        // Si la réponse n'est pas OK, extraire le message d'erreur du backend
        const errorMessage = await response.text();
        setError(errorMessage);
        // Afficher le message d'erreur
        toast.current?.show({ severity: 'warn', summary: 'Warning', detail: errorMessage || "Something went wrong", life: 3000 });
      }
    } catch (error) {
      // Gérer les erreurs de requête
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Erreur lors de la vérification de l\'OTP:', life: 3000 });
      console.error('Erreur lors de la vérification de l\'OTP:', error);
    }
  };
  
  return (
    <div className={styles.background}>
      <div className="card flex justify-content-center">
        <div className="flex flex-column align-items-center">
          <Toast ref={toast} />
          <p className="font-bold text-xl mb-2">Un Mail a été envoyé a vous </p>
          <p className="text-color-secondary block mb-5">
            Please entrer le code recevrez dans mail.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="card flex justify-content-center">
              <div className={styles.loginBox}>
                <div className={styles.inputs}>
                  {/* Création des champs d'entrée pour l'OTP */}
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <input
                      key={index}
                      id={`input${index}`}
                      type="text"
                      maxLength={1}
                      onChange={handleInputChange}
                      value={otp[index - 1] || ""}
                      className={
                        error && error.includes("incorrect")
                          ? styles.errorInput
                          : ""
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-content-between mt-5 align-self-stretch">
              <Button label="Reenvoyer code " link className="p-0"></Button>
              <Button label="Valider"></Button>
            </div>
         
          </form>
        </div>
      </div>
    </div>
  );
}
