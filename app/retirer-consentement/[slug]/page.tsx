import Image from "next/image";
import classes from "./page.module.css";
import logo from "@/assets/info-perso.png";
import logo2 from "@/assets/logo.png";
import Link from "next/link";
import "primeicons/primeicons.css";
import Blog from "@/components/blog/Blog";
import Cards from "@/components/card/Card";
import RetirerConsentment from "@/components/retirer-consentement/RetirerConsentment";
import RenvoyerConvention from "@/components/renvoyer-convention/RenvoyerConvention";
import { FindClient, FindParticipant } from "@/components/find-participant/FindParticipant";
import AccessDeniedPage from "@/app/access-denied/page";
import UserInformations from "@/components/user-table/UserInformation";

export default async function UserInformation({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;


const clientInfo = await FindClient(params)
const client_consentement = clientInfo ? clientInfo.horodatageConsentement : null;
const userToken = clientInfo ? clientInfo.token : null;
return (
  <div className={classes.container}>
    {userToken && client_consentement ? (
      <>
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
             <div>
              <UserInformations slug={slug} />
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
           
            <div className={classes.blogCardSection}>
              <div className="blog">
                <RenvoyerConvention slug={slug} />
              </div>
              <br />
              <div className="RetirerConsentment">
                <RetirerConsentment slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <AccessDeniedPage/>
    )}
  </div>
);
}