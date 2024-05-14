
import AdminInfo from "@/components/admin-info/AdminInfo"
import AuthenticatedGuard from "@/components/authguard/AuthenticatedGuard"
import { UserOauth2Info } from "@/components/user-oauth2-info/UserOauth2Info"

export default async function AdminInformations() {

    const userInfo = await UserOauth2Info()
     
    return (
            
                <div>
                    <AdminInfo email={userInfo.email}/>
                </div>
    
    )
}