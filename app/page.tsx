import Image from "next/image";
import classes from "./page.module.css";
import statistiqueLogo from "@/assets/statistiqueLogo.png";
import logo2 from "@/assets/logo.png";
import AuthenticatedGuard from "@/components/authguard/AuthenticatedGuard";
import CercleChart from "@/components/cerclechart/CercleChart";
import LineChart from "@/components/line-chart/LineChart";
import AdminInformations from "@/components/admin-info/admin-info-prop/page";

export default function Dashboard() {
  return (
    <AuthenticatedGuard>
      <div className={classes.container}>
        <div className={classes.column1}>
          <div className={classes.columnContent}>
            <h2>Statistiques des participants</h2>
            <Image
              src={statistiqueLogo}
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
            <div className={classes.Cerclechartinfos}>
              <hr />
              <h4 className={classes.cercleChartTile}>
                <b>
                  Répartition des participants selon leur statut de consentement
                  , relance et de révocation
                </b>
              </h4>
              <hr />

              <div className={classes.cercleChart}>
                <CercleChart />
              </div>
            </div>

            <div className={classes.Linechartinfos}>
              <hr />
              <h4 className={classes.LineChartTile}>
                <b>
                Évolution mensuelle du consentement et de la révocation des participants
                </b>
              </h4>
              <hr />
              <div className={classes.LineChart}>
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedGuard>
  );
}
