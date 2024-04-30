
import classes from "./UserTable.module.css";


import 'primeicons/primeicons.css';

interface UserData {
  civilite: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface UserTableProps {
  userData: UserData;
}

const UserTable: React.FC<UserTableProps> = ({ userData }) => {
  
  return (
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
            <td className={classes.td2}>{userData.civilite}</td>
          </tr>
          <tr>
            <td className={classes.td1}>
              <b>Nom</b>
            </td>
            <td className={classes.td2}>{userData.nom}</td>
          </tr>
          <tr>
            <td className={classes.td1}>
              <b>Prénom</b>
            </td>
            <td className={classes.td2}>{userData.prenom}</td>
          </tr>
          <tr>
            <td className={classes.td1}>
              <b>Email</b>
            </td>
            <td className={classes.td2}>{userData.email}</td>
          </tr>
          <tr>
            <td className={classes.td1}>
              <b>Téléphone</b>
            </td>
            <td className={classes.td2}>{userData.telephone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
