import React from 'react'



export default async function GetStatistics() {
    try {
        const StatisticsInfo = await fetch(`http://localhost:8081/api/v1/client/get-statistics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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