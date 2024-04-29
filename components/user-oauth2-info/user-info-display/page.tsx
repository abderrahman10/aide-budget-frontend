
import AuthenticatedGuard from "@/components/authguard/AuthenticatedGuard"
import { UserOauth2Info } from "../UserOauth2Info"

export default async function ProtectedPage() {

    const userInfo = await UserOauth2Info()

    return (
        <AuthenticatedGuard>
            <div className="h-screen flex flex-col w-full items-center justify-center">
                PROTECTED PAGE

                <div className="flex flex-col gap-y-1">
                    {userInfo && Object.keys(userInfo).map((key) => (
                        <div key={key}>
                            <span className="font-bold">{key}</span>: <span>{userInfo[key]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedGuard>
    )
}