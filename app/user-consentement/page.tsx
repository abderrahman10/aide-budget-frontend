import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/files.png";
import Link from "next/link";
import CheckBox from "@/components/check-box/CheckBox";
import 'primeicons/primeicons.css';
import PdfSigner from "@/components/Pdf-signer/PdfSigner";
        
export default function UserInformation() {
  return (
    <div className={classes.container}>
      <div className={classes.column1}>
        <div className={classes.columnContent}>
          <h2>Votre Consentement</h2>
          <Image
            src={logo}
            alt="Files"
            width={100}
            height={100}
            className={classes.fileImg}
          />
        </div>
      </div>
      <div className={classes.column2}>
        <div className={classes.secondColumnInfo}>
        <i className="pi pi-angle-left" style={{ color: 'slateblue' }}>
            <Link className={classes.LinkButton} href="/user-information">
            Retour
          </Link>
        </i>

          <div>
            <CheckBox />
        
          </div>

      
          <div>
            <p>
              {" "}
              <strong>Nota Bene :</strong> Vous pouver retirer votre
              consentement à tout moment.Attention, vous ne pourrez plus
              bénéficier de l accompagnement Initiative Aide Budget
            </p>
            <p>
              {" "}
              <strong>Pour tout question : </strong> vous pouvez nous écrire à{" "}
              <a href="email@email.com">email@email.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
