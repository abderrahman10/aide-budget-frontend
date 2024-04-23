import { redirect } from "next/navigation"
import { UserOauth2Info } from "../user-oauth2-info/UserOauth2Info";

export default async function AuthenticatedGuard({ children }: { children: React.ReactNode }) {

    const userInfoResponse = await UserOauth2Info()

    if (!userInfoResponse) {

        redirect('/login')
    }

    return (
        <>
            {children}
        </>
    )
}



