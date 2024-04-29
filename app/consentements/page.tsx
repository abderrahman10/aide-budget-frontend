
import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/files.png";
import logo2 from "@/assets/logo.png";
import { Button } from "primereact/button";
import UploadFile from "@/components/upload-file/UploadFile";
import RelanceCsv from "@/components/relance-csv/RelanceCsv";
import AuthenticatedGuard from "@/components/authguard/AuthenticatedGuard";
        

export default function Consentements() {
  return (
    <AuthenticatedGuard>

    <div className={classes.container}>
      <div className={classes.column1}>
        <div className={classes.columnContent}>
          <h2>Gestion des consentements</h2>
          <Image
            src={logo}
            alt="Files"
            width={100}
            height={100}
            className={classes.fileImg}
          />
          <div className={classes.userInfo}>
            <p>Nom/Prénom : test</p>
            <p>NNI: hello</p>
            <p>Privilège administrateur : 01262232952929323232</p>
          </div>
        </div>
      </div>
      <div className={classes.column2}>
        <Image
          src={logo2}
          alt="Logo"
          width={100}
          height={100}
          className={classes.logo}
        />
        <div className={classes.secondColumnInfo}>
          <h4>
            <b>Gestion des consentements</b>
          </h4>
          <p>
            Pour exporter les nouveaux consentements ou retraits de
            consentements depuis la dernière exportation, <br /> cliquez sur le
            bouton ci-dessous :
          </p>
          <div className="card flex justify-content-center">
            <Button label="Submit" />
          </div>
          <div className={classes.tableElement}>
            <h4>
              <b>Historique</b>
            </h4>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Date export</th>
                  <th>Nom du Fichier</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div className={classes.reservedSection}>
            <hr />
            <h4 className={classes.reservedTitle}>
              <b>Section réservée aux administrateurs de application</b>
            </h4>
            <hr />
          </div>
          <div className="submitButtons" >
          <UploadFile/>
    
          <RelanceCsv/>
         </div>
          
        </div>
      </div>
    </div>
    </AuthenticatedGuard>

  );
}