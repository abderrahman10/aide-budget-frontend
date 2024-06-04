import { parseCookies } from 'nookies';


export async function GetParticipantsStatistics() {
    const cookies = parseCookies();
    const JSSESSION = cookies.JSESSIONID;
  
    try {
        const response = await fetch('http://localhost:8081/api/v1/participant/count-by-month', {
            method: 'GET',
            headers: {
                Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
              },
              credentials: "include",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
