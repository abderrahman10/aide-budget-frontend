import React from "react";
import { Fieldset } from "primereact/fieldset";

export default function Blog() {
  return (
    <div className="card">
      <Fieldset legend="Aide-Budget, c'est quoi ?">
        <p className="m-0">
          Le gouvernement a lancé le 27 février 2023 une nouvelle initiative
          nommée Aide-Budget qui associe, dans une démarche commune de
          prévention du surendettement, pouvoirs publics, fournisseurs d &apos;
          énergie, fédérations de bailleurs sociaux et le réseau des Points
          Conseil Budget. Cette expérimentation, menée durant douze mois sur
          onze départements en métropole et en Outre-mer, a pour objectif de
          repérer en amont les signaux de surendettement des ménages afin de
          leur proposer un accompagnement personnalisé
        </p>
      </Fieldset>
    </div>
  );
}

