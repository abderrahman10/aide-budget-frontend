import { cookies } from "next/headers";

export async function UserOauth2Info() {

    const cookieStore = cookies();
    const JSSESSION = cookieStore.get('JSESSIONID')

    try {
        const userInfoResponse = await fetch('http://localhost:8081/api/v1/admin/user-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `JSESSIONID=${JSSESSION?.value}`
            },
            credentials: 'include'
        })

        if (!userInfoResponse.ok) {
            return null;
        }

        return await userInfoResponse?.json()
    } catch (error) {
        console.log(error)
        return null;
    }

}