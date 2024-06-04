import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import styles from "./InputOtpCode.module.css";
import { Toast } from "primereact/toast";

export default function InputOtpCode({ slug ,onClose}: { slug: string ,onClose: () => void }) {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);


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
   
  async function SendEmailWithOtpCodeHandler() {
    setLoading2(true);
    try {
      const url = `http://localhost:8081/api/v1/participants/email/sendEmailWithOtp/${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });

      if (response.ok) {

        console.log(response);
        setTimeout(() => {
          setLoading2(false);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Mail avec le code OTP a été  envoyé avec succès",
            life: 3000,
          });
      }, 2000);
        
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
  
  const handleSubmit = async () => {
   
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
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Mail avec votre contrat signé a été envoyer avec succés",
            life: 3000,
          });
      }, 2000);
        setTimeout(() => {
          onClose();
        }, 2000);
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
          <p className="font-bold text-xl mb-2">Un email a été envoyé a vous </p>
          <p className="text-color-secondary block mb-5">
            Please entrer le code recevrez dans mail.
          </p>
          
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
              <Button label="Renvoyer le code"onClick={SendEmailWithOtpCodeHandler} loading={loading2} link className="p-0"></Button>
              <Button label="Valider" onClick={handleSubmit} loading={loading}></Button>
            </div>
         
        
        </div>
      </div>
    </div>
  );
}
