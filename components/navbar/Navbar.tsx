import { UserOauth2Info } from "@/components/user-oauth2-info/UserOauth2Info";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

export default async function Navbar() {
  const userInfo = await UserOauth2Info();
  return (
    <div>
      {userInfo?.imageUrl ? (
        <AdminNavbar image={userInfo.imageUrl} />
      ) : (
        <UserNavbar/>
      )}
    </div>
  );
}

