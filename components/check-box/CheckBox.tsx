'use client'
import React, { useState } from "react";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import  Styles  from "./Checkbox.module.css";
import Pdf from "../pdf/Pdf";
import OtpDialog from "../otp-dialog/OtpDialog";

export default function CheckBox({  slug }: {  slug: string}) {
  const token =slug;

    const [confirmations, setConfirmation] = useState<string[]>([]);
   const[ConfirmationCount,setConfirmationCount] = useState<number>(0);

    const onConfirmationChange = (e: CheckboxChangeEvent) => {
        let _confirmations = [...confirmations];

        if (e.checked)
            _confirmations.push(e.value);
        else
        _confirmations.splice(_confirmations.indexOf(e.value), 1);

        setConfirmation(_confirmations);
        setConfirmationCount(_confirmations.length);
      console.log(ConfirmationCount);
    }

    return (
        <div className={Styles.checkbox}> 
        <div className="flex flex-column gap-3">
            <div className="flex align-items-top">
                <Checkbox inputId="confirmation1" name="1" value="1" onChange={onConfirmationChange} checked={confirmations.includes('1')} />
                <label htmlFor="confirmation1" className="ml-2">J&apos;accepte que l entreprise EDF enregistre et traite les données à caractère 
                personnel que je viens de renseigner dans ce formulaire qui correspondent à mes nom et prénom, mes coordonnées mail et téléphonique.</label>
            </div>
            <div className="flex align-items-top">
                <Checkbox inputId="confirmation2" name="2" value="2" onChange={onConfirmationChange} checked={confirmations.includes('2')} />
                <label htmlFor="confirmation2" className="ml-2">Je prends note que le traitement de mes données répond aux finalités suivantes : conseil et accompagnement budgétaire - prévention du surendettement.</label>
            </div>
            <div className="flex align-items-top">
                <Checkbox inputId="confirmation3" name="3" value="3" onChange={onConfirmationChange} checked={confirmations.includes('3')} />
                <label htmlFor="confirmation3" className="ml-2">J&apos;accepte que ces informations soient communiquées à des tiers extérieurs Points Conseil Budget suivants : UDAF 93 dans le respect des finalités précédemment énoncées.</label>
            </div>
          <div className="pdf">
          {ConfirmationCount === 3 && (
                    <>
                        <Pdf />
                        <OtpDialog slug={token} />
                    </> )}
               
          </div>
        </div>
        </div>
    )
}