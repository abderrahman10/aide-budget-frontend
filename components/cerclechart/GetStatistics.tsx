import React from 'react'
import { parseCookies } from 'nookies';





export default async function GetStatistics() {
    const cookies = parseCookies();
    const JSSESSION = cookies.JSESSIONID;
    try {
        const StatisticsInfo = await fetch(`http://localhost:8081/api/v1/participant/get-statistics`, {
            method: 'GET',
            headers: {
                Cookie: `JSESSIONID=${JSSESSION?.valueOf}`,
              },
              credentials: "include",
        });

        if (!StatisticsInfo.ok) {
            return null;
        }

        return await StatisticsInfo.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}