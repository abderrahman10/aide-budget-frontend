import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/files.png";
import logo2 from "@/assets/logo.png";
import { Button } from "primereact/button";

export default function UserInformation() {
 
  return (
    <div className={classes.container}>
      <div className={classes.column1}>
        <div className={classes.columnContent}>
          <h2>Vos informations personnelles</h2>
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
        <Image
          src={logo2}
          alt="Logo"
          width={100}
          height={100}
          className={classes.logo}
        />
        <div className={classes.secondColumnInfo}>
          <p>
            Dans le cadre de l initiative Aide-Budget, je vous ai proposé un
            accompagnement personnalisé pour vos impayés d énergie. Le recueil
            de votre consentement est nécessaire pour que je puisse transmettre
            vos coordonnées au Point Conseil Budget qui va prendre contact avec
            vous. <br />
            <br />
            À très bientôt, <br /> <br />
            Votre conseiller Solidarité EDF
          </p>
          <div className={classes.tableElement}>
            <table className={classes.tableStriped}>
              <thead>
                <tr>
                  <th colSpan={2}>Vos informations personnelles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.td1}>Civilité</td>
                  <td className={classes.td2}>Monsieur</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
                   
                    <b>Nom</b>
                  </td>
                  <td className={classes.td2}> aaa</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
                   
                    <b>Prénom</b>
                  </td>
                  <td className={classes.td2}> aaa</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
                    
                    <b>Email</b>
                  </td>
                  <td className={classes.td2}> aaa@gmail.com</td>
                </tr>
                <tr>
                  <td className={classes.td1}>
               
                    <b>Téléphone</b>
                  </td>
                  <td className={classes.td2}> 066666</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={classes.importSection}>
            <h2>
              Pour bénéficier dun accompagnement aide budget, rien de plus
              simple, il vous suffit de donner votre accord en cliquant sur le
              bouton ci-dessous
            </h2>

            <div className="card flex flex-wrap justify-content-center gap-2">
              <Button label="Submit" type="submit"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}