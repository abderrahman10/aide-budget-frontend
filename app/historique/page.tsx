import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/files.png";
import logo2 from "@/assets/logo.png";
import { Button } from "primereact/button";
import UploadFile from "@/components/upload-file/UploadFile";
import RelanceCsv from "@/components/relance-csv/RelanceCsv";
import AuthenticatedGuard from "@/components/authguard/AuthenticatedGuard";
import ProtectedPage from "../../components/admin-info/admin-info-prop/page";
import AdminInformations from "../../components/admin-info/admin-info-prop/page";
import HistoriqueFilesTable from "@/components/historique-table/HistoriqueFilesTable";
import CreateParticipantForm from "@/components/createParticipant/CreateParticipantForm";

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
              <AdminInformations />
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
              Pour consulter les dernières exportations de consentements ou de
              retraits de consentements, veuillez vous référer au tableau
              ci-dessous :
            </p>

            <div className={classes.tableElement}>
              <h4>
                <b>Historique</b>
              </h4>
              <HistoriqueFilesTable />
            </div>
           
          </div>
        </div>
      </div>
    </AuthenticatedGuard>
  );
}
